// src/utils/ethers.ts
import { providers } from "ethers";
import { usePublicClient, useWalletClient } from "wagmi";
import type { HttpTransport, PublicClient, WalletClient } from "viem";
import React from "react";

// Convert wagmi's PublicClient → ethers.Provider
export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  if (!chain) {
    throw new Error("Chain is not defined");
  }
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === "fallback") {
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<HttpTransport>[]).map(({ value }) => new providers.JsonRpcProvider(value?.url, network))
    );
  }
  return new providers.JsonRpcProvider(transport.value?.url, network);
}

// Hook: use ethers Provider from wagmi PublicClient
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return React.useMemo(() => (publicClient ? publicClientToProvider(publicClient) : undefined), [publicClient]);
}
export function walletClientToSigner(client: WalletClient) {
  const { chain, transport, account } = client;
  if (!chain) {
    throw new Error("Chain is not defined");
  }
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  // Use ethers.providers.Web3Provider to wrap the transport
  const ethersProvider = new providers.Web3Provider(
    // @ts-ignore: transport.value is EIP-1193 provider (e.g. window.ethereum)
    transport.value || (window as any).ethereum,
    network
  );
  return ethersProvider.getSigner(account?.address);
}

// Hook: use ethers Signer from wagmi WalletClient
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(() => (walletClient ? walletClientToSigner(walletClient) : undefined), [walletClient]);
}
