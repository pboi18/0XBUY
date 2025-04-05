"use client";

import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import { Providers } from "../providers";
import { Analytics } from "@vercel/analytics/react";

const treasuryConfig = {
  treasury: "xion1swca6mjq3ll6dz59j2vzk9m27qpn7lw87p9qwh4prs7l38faaxhq5cktej",
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
