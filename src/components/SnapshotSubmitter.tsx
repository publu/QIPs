import React, { useState } from "react";
import { useEthersSigner } from "../utils/ethers";
import { createProposal } from "../utils/snapshot-client";
import { Proposal } from "@snapshot-labs/snapshot.js/dist/src/sign/types";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";

interface SnapshotSubmitterProps {
  frontmatter: any;
  html: string;
}

const SnapshotSubmitter: React.FC<SnapshotSubmitterProps> = ({ frontmatter, html }) => {
  const signer = useEthersSigner();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<React.ReactNode>(null);

  const stripHtml = (html: string) => {
    if (typeof window === "undefined") return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const TOKEN_CONTRACT_ADDRESS = "0x1bffabc6dfcafb4177046db6686e3f135e8bc732";
  const REQUIRED_BALANCE = 150000;
  const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)", "function decimals() view returns (uint8)"];

  const fetchTokenBalance = async () => {
    if (!signer) return 0;
    const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ERC20_ABI, signer);
    const address = await signer.getAddress();
    const [balance, decimals] = await Promise.all([tokenContract.balanceOf(address), tokenContract.decimals()]);
    return Number(ethers.utils.formatUnits(balance, decimals));
  };

  const { data: tokenBalance = 0, isLoading: checkingBalance } = useQuery({
    queryKey: ["tokenBalance", TOKEN_CONTRACT_ADDRESS, signer ? "connected" : "disconnected"],
    queryFn: fetchTokenBalance,
    enabled: !!signer,
    staleTime: 30000,
    refetchInterval: 60000,
  });

  const proposalOptions: Proposal = {
    space: "qidao.eth",
    type: "single-choice",
    title: frontmatter.title,
    body: `QIP #${frontmatter.qip}: ${frontmatter.title}\n\n${stripHtml(html)}`,
    choices: ["Yes", "No", "Abstain"],
    start: Math.floor(Date.now() / 1000) + 3600,
    end: Math.floor(Date.now() / 1000) + 3600 + 86400,
    snapshot: 0,
    discussion: "",
    plugins: "",
  };

  const handleSubmit = async () => {
    if (!signer) {
      setStatus("Please connect your wallet first.");
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const receipt = await createProposal(signer, "https://hub.snapshot.org", proposalOptions);
      if (receipt && (receipt as any).id) {
        const proposalId = (receipt as any).id;
        const proposalUrl = `https://snapshot.org/#/qidao.eth/proposal/${proposalId}`;
        setStatus(
          <span>
            Proposal created successfully!
            <a href={proposalUrl} target="_blank" rel="noopener noreferrer" className="ml-2 underline hover:no-underline">
              View proposal →
            </a>
          </span>
        );
      } else {
        setStatus(`Proposal created: ${JSON.stringify(receipt)}`);
      }
    } catch (e: any) {
      console.error("Snapshot submission error:", e);
      if (e.error && e.error_description) {
        setStatus(`Error: ${e.error_description}`);
      } else if (e.code === "ACTION_REJECTED" || e.code === 4001) {
        setStatus("Transaction cancelled by user");
      } else {
        setStatus(`Error: ${e.message || "Failed to create proposal. Please try again."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col items-center">
        {status && (
          <p
            className={`mt-2 text-sm ${
              typeof status === "string" && (status.includes("Error") || status.includes("failed") || status.includes("cancelled"))
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
      </div>

      {status && (
        <p
          className={`text-center text-sm ${
            typeof status === "string" && (status.includes("Error") || status.includes("failed") || status.includes("cancelled"))
              ? "text-red-600 font-medium"
              : "text-green-600 font-medium"
          }`}
        >
          {status}
        </p>
      )}
    </>
  );
};

export default SnapshotSubmitter;
