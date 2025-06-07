import React from 'react';
import { graphql } from 'gatsby';
import { getGithubLink } from '../../utils';
import Layout from '../../layout';
import FrontmatterTable from '../../components/FrontmatterTable';
import { useState } from "react";
import { useEthersSigner } from "../../utils/ethers";
import { createProposal } from "../../utils/snapshot-client";
import { Proposal } from "@snapshot-labs/snapshot.js/dist/src/sign/types";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";

interface Props {
  frontmatter__qip: number;
  data: any;
}

const Template: React.FC<Props> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html, fileAbsolutePath } = markdownRemark;
  const githubLink = getGithubLink(fileAbsolutePath);

  // Hook to get ethers Signer; undefined until wallet connected
  const signer = useEthersSigner();

  // Local state for confirmation / feedback
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Helper function to strip HTML tags and convert to plain text
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // ERC20 token contract details
  const TOKEN_CONTRACT_ADDRESS = "0x1bffabc6dfcafb4177046db6686e3f135e8bc732";
  const REQUIRED_BALANCE = 150000; // 150k tokens

  // Minimal ERC20 ABI for balance checking
  const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)", "function decimals() view returns (uint8)"];

  // Query function for fetching token balance
  const fetchTokenBalance = async () => {
    if (!signer) {
      return 0;
    }

    const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ERC20_ABI, signer);
    const address = await signer.getAddress();
    const [balance, decimals] = await Promise.all([tokenContract.balanceOf(address), tokenContract.decimals()]);

    // Convert balance to number with proper decimal handling
    const balanceInTokens = Number(ethers.utils.formatUnits(balance, decimals));
    return balanceInTokens;
  };

  // Use react-query to fetch and cache token balance
  const {
    data: tokenBalance = 0,
    isLoading: checkingBalance,
    error: balanceError,
  } = useQuery({
    queryKey: ["tokenBalance", TOKEN_CONTRACT_ADDRESS, signer ? "connected" : "disconnected"],
    queryFn: fetchTokenBalance,
    enabled: !!signer,
    staleTime: 30000, // Consider data stale after 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });

  // Example values for proposal; adjust fields per your space/schema
  const proposalOptions: Proposal = {
    space: "qidao.eth", // e.g. 'myproject.eth'
    type: "single-choice" as const,
    title: frontmatter.title,
    body: `QIP #${frontmatter.qip}: ${frontmatter.title}\n\n${stripHtml(html)}`,
    choices: ["Yes", "No", "Abstain"],
    start: Math.floor(Date.now() / 1000),
    end: Math.floor(Date.now() / 1000) + 86400, // 24h window
    snapshot: 0, // will auto-fetch if zero
    discussion: "",
    plugins: "",
  };

  // Handler to submit to Snapshot once Signer is available
  const handleSubmit = async () => {
    if (!signer) {
      setStatus("Please connect your wallet first.");
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const receipt = await createProposal(
        signer,
        "https://hub.snapshot.org", // or your custom hub endpoint
        proposalOptions
      );
      setStatus(`Proposal created: ${(receipt as any).txHash}`);
    } catch (e: any) {
      setStatus(`Error: ${e.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-full">
        <div className="content mt-30 overflow-y-auto h-screen flex justify-center items-start">
          <div id="content-center" className="relative w-full pl-0 lg:w-3/4 lg:pl-5 mt-20">
            <div className="">
              <div className="flex justify-center sm:m-0 m-3">
                <FrontmatterTable frontmatter={frontmatter} />
              </div>

              <div className="markdown-content mt-3 p-3 md:p-none">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
              </div>
              {/* Add Snapshot Proposal Button */}
              <div className="mt-6 flex flex-col items-center">
                <button
                  className={`px-4 py-2 rounded transition-colors ${
                    !signer || tokenBalance < REQUIRED_BALANCE || loading || checkingBalance
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                  onClick={handleSubmit}
                  disabled={!signer || tokenBalance < REQUIRED_BALANCE || loading || checkingBalance}
                >
                  {loading
                    ? "Submitting..."
                    : checkingBalance
                    ? "Checking balance..."
                    : !signer
                    ? "Connect Wallet"
                    : tokenBalance < REQUIRED_BALANCE
                    ? `Insufficient Balance (${tokenBalance.toLocaleString()} / ${REQUIRED_BALANCE.toLocaleString()} required)`
                    : "Submit to Snapshot"}
                </button>
                {status && <p className="mt-2 text-sm">{status}</p>}
                {signer && tokenBalance >= REQUIRED_BALANCE && (
                  <p className="mt-1 text-xs text-gray-600">Token balance: {tokenBalance.toLocaleString()} (✓ meets requirement)</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Template;

export const pageQuery = graphql`
    query ($frontmatter__qip: Int) {
        markdownRemark(frontmatter: { qip: { eq: $frontmatter__qip } }) {
            fileAbsolutePath
            frontmatter {
                qip
                title
                author
                network
                type
                proposal
                implementor
                release
                created
                updated
                status
            }
            html
        }
    }
`;
