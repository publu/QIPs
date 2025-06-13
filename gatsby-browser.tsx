import "./src/styles/global.css";

// gatsby-browser.js
import React from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet } from "wagmi/chains";
import { http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    appName: "Qidao",
    enableFamily: false,
    walletConnectProjectId: process.env.GATSBY_WALLETCONNECT_PROJECT_ID!,
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(),
    },
  })
);
const queryClient = new QueryClient();

export const wrapRootElement = ({ element }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ConnectKitProvider>{element}</ConnectKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
