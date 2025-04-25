"use client";

import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import { Providers } from "../providers";
import { Analytics } from "@vercel/analytics/react";

const treasuryConfig = {
  treasury: "xion12vkwkgwx395g0ytgnhdddak57vc96af9trygqwj8zq2des4mevpqklagqk",
  rpcUrl: "https://rpc.xion-testnet-2.burnt.com/",
  restUrl: "https://api.xion-testnet-2.burnt.com/",
};

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AbstraxionProvider config={treasuryConfig}>
      <Providers>
        {children}
        <Analytics />
      </Providers>
    </AbstraxionProvider>
  );
}
