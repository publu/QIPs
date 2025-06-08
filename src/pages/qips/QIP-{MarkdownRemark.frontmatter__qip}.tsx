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
  const [status, setStatus] = useState<React.ReactNode>(null);

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
    start: Math.floor(Date.now() / 1000) + 3600, // Start in 1 hour (voting delay)
    end: Math.floor(Date.now() / 1000) + 3600 + 86400, // End 24h after start
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

      // Handle successful response from Snapshot
      if (receipt && (receipt as any).id) {
        const proposalId = (receipt as any).id;
        const proposalUrl = `https://snapshot.box/#/s:${proposalOptions.space}/proposal/${proposalId}`;

        setStatus(
          <span>
            Proposal created successfully!
            <a href={proposalUrl} target="_blank" rel="noopener noreferrer" className="ml-2 underline hover:no-underline">
              View proposal →
            </a>
          </span>
        );
      } else {
        // Fallback if response format is unexpected
        setStatus(`Proposal created: ${JSON.stringify(receipt)}`);
      }
    } catch (e: any) {
      // Improved error handling
      console.error("Snapshot submission error:", e);

      // Handle Snapshot-specific error format
      if (e.error && e.error_description) {
        // Snapshot API errors
        const errorType = e.error;
        const errorDesc = e.error_description;

        // Map common Snapshot errors to user-friendly messages
        if (errorDesc.includes("voting delay")) {
          setStatus("Error: Invalid voting delay. Proposals must have a delay period before voting starts.");
        } else if (errorDesc.includes("voting period")) {
          setStatus("Error: Invalid voting period. Check the proposal duration settings.");
        } else if (errorDesc.includes("already exists")) {
          setStatus("Error: A proposal with this content already exists.");
        } else if (errorDesc.includes("space not found")) {
          setStatus("Error: Snapshot space not found. Check the space name.");
        } else if (errorDesc.includes("not authorized")) {
          setStatus("Error: You are not authorized to create proposals in this space.");
        } else if (errorDesc.includes("start date")) {
          setStatus("Error: Invalid start date. Proposal must start in the future.");
        } else if (errorDesc.includes("end date")) {
          setStatus("Error: Invalid end date. End date must be after start date.");
        } else {
          // Show the actual error description from Snapshot
          setStatus(`Error: ${errorDesc}`);
        }
      } else if (e.code === "ACTION_REJECTED" || e.code === 4001) {
        // User rejected the transaction
        setStatus("Transaction cancelled by user");
      } else if (e.message?.includes("network") || e.message?.includes("fetch")) {
        // Network/HTTP errors
        setStatus("Network error: Please check your connection and try again");
      } else if (e.message?.includes("gas")) {
        // Gas-related errors
        setStatus("Transaction failed: Insufficient gas or gas price too low");
      } else {
        // Generic error fallback
        setStatus(`Error: ${e.message || e.error_description || "Failed to create proposal. Please try again."}`);
      }
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
              {/* Add large title at the top */}
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 pt-10">
                QIP-{frontmatter.qip}: {frontmatter.title}
              </h1>

              {/* Move submission button to the top */}
              <div className="mb-6 flex flex-col items-center">
                {status && (
                  <p
                    className={`mt-2 text-sm ${
                      typeof status === "string" &&
                      (status.includes("Error") || status.includes("error") || status.includes("failed") || status.includes("cancelled"))
                        ? "text-red-600 font-medium"
                        : "text-green-600 font-medium"
                    }`}
                  >
                    {status}
                  </p>
                )}
                {signer && tokenBalance >= REQUIRED_BALANCE && (
                  <p className="mt-1 text-xs text-gray-600">Token balance: {tokenBalance.toLocaleString()} (✓ meets requirement)</p>
                )}
              </div>

              <div className="flex justify-center sm:m-0 m-3">
                <FrontmatterTable frontmatter={frontmatter} />
              </div>

              <div className="markdown-content mt-3 p-3 md:p-none">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
              </div>
              <div className="flex flex-col w-full gap-y-3 items-left pb-10">
                <span className="text-2xl font-bold text-black">Submit to Snapshot</span>

                <button
                  className={`m-auto w-fit px-6 py-3 rounded-lg font-medium transition-colors ${
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

                {/* Status display near submit button */}
                {status && (
                  <p
                    className={`text-center text-sm ${
                      typeof status === "string" &&
                      (status.includes("Error") || status.includes("error") || status.includes("failed") || status.includes("cancelled"))
                        ? "text-red-600 font-medium"
                        : "text-green-600 font-medium"
                    }`}
                  >
                    {status}
                  </p>
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
