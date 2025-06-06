// src/templates/Template.tsx
import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../../layout";
import FrontmatterTable from "../../components/FrontmatterTable";
import { useEthersSigner } from "../../utils/ethers"; // adjusted path
import { createProposal } from "../../utils/snapshot-client";
import { Proposal } from "@snapshot-labs/snapshot.js/dist/src/sign/types";

interface Props {
  frontmatter__qip: number;
  data: any;
}

const Template: React.FC<Props> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html, fileAbsolutePath } = markdownRemark;

  // Hook to get ethers Signer; undefined until wallet connected
  const signer = useEthersSigner();

  // Local state for confirmation / feedback
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Example values for proposal; adjust fields per your space/schema
  const proposalOptions: Proposal = {
    space: "qidao.eth", // e.g. 'myproject.eth'
    type: "single-choice" as const,
    title: frontmatter.title,
    body: `QIP #${frontmatter.qip} proposal content here.`,
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
            <div>
              <div className="flex justify-center sm:m-0 m-3">
                <FrontmatterTable frontmatter={frontmatter} />
              </div>
              <div className="markdown-content mt-3 p-3 md:p-none">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
              </div>
              {/* Add Snapshot Proposal Button */}
              <div className="mt-6 flex flex-col items-center">
                <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting..." : "Submit to Snapshot"}
                </button>
                {status && <p className="mt-2 text-sm">{status}</p>}
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
