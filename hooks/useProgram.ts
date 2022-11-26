import { useWallet } from "@solana/wallet-adapter-react";
import { Idl, Program, AnchorProvider } from "@project-serum/anchor";
import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { openRpcConnection } from "../utils/openRpcConnection";
import idl from "../idl.json";

export type Maybe<T> = T | null;

export default function useProgram() {
    const [ program, setProgram ] = useState<Maybe<Program<Idl>>>( null );
    const { publicKey, wallet, signTransaction, signAllTransactions } = useWallet();

    useEffect( () =>
    {
        const signerWallet = {
            publicKey: publicKey,
            signTransaction: signTransaction,
            signAllTransactions: signAllTransactions,
        };

        if ( !wallet || !publicKey || !signTransaction || !signAllTransactions )
        {
            return;
        }

        const programId = new PublicKey( String( process.env.NEXT_PUBLIC_PROGRAM_ID ) );
        const connection = openRpcConnection();
        const opts: { preflightCommitment: "processed"; } = {
            preflightCommitment: "processed",
        };
        const provider = new AnchorProvider(
            connection, signerWallet, opts,
        );
        const programInner = new Program( idl as Idl, programId, provider );
        setProgram( programInner );
    }, [ publicKey, signAllTransactions, signTransaction, wallet ] );
}