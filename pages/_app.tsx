import React, { FC, useMemo } from "react";
import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
import '../styles/globals.css'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
require('@solana/wallet-adapter-react-ui/styles.css')

function MyApp({ Component, pageProps }: AppProps) {
  const network = String(process.env.NEXT_PUBLIC_CLUSTER)
  const endpoint = useMemo(() => String(process.env.NEXT_PUBLIC_RPC_ENDPOINT), [network]);

  const wallets = useMemo(
      () => [
        new PhantomWalletAdapter()
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [network]
  );

  return (
    <>
    <Toaster />
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Component {...pageProps} />
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </>
  )
}

export default MyApp;
