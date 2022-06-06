import React, { FC, useMemo } from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";

import '../styles/globals.css'
require('@solana/wallet-adapter-react-ui/styles.css')

const endpoint = "https://explorer-api.devnet.solana.com";

const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
)

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider>
          <Component {...pageProps} />
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp;
