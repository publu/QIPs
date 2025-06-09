import snapshot from "@snapshot-labs/snapshot.js";
import { Proposal } from "@snapshot-labs/snapshot.js/dist/src/sign/types";
import { providers, Signer } from "ethers";

export function getSnapshotClient(hub: string) {
  return new snapshot.Client712(hub);
}

// Create a proposal using ethers.Signer
export async function createProposal(signer: Signer, hub: string, options: Proposal) {
  const client = getSnapshotClient(hub);
  if (!options.snapshot) {
    options.snapshot = (await signer.provider?.getBlockNumber()) || 0;
  }
  const proposal = {
    space: options.space,
    type: options.type,
    title: options.title,
    body: options.body,
    choices: options.choices,
    start: options.start,
    end: options.end,
    snapshot: options.snapshot,
    discussion: options.discussion || "",
    plugins: options.plugins || "",
  };

  if (!signer.provider) {
    throw new Error("Signer must have a provider to create a proposal.");
  }

  const receipt = await client.proposal(signer.provider as providers.Web3Provider, await signer.getAddress(), proposal);
  return receipt;
}
