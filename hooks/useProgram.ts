import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Idl, Program, AnchorProvider } from "@project-serum/anchor";
import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { openRpcConnection } from "../utils/openRpcConnection";
import idl from "../idl.json";

export default function useProgram ()
{
    const [program, setProgram] = useState<Program<Idl>>();
    const wallet = useAnchorWallet();

    useEffect( () =>
    {
        if ( wallet == null )
        {
            return;
        }

        const programId = new PublicKey( String( process.env.NEXT_PUBLIC_PROGRAM_ID ) );
        const connection = openRpcConnection();
        const opts: { preflightCommitment: "processed"; } = {
            preflightCommitment: "processed",
        };
        const provider = new AnchorProvider(
            connection, wallet, opts,
        );
        const programInner = new Program( idl as any, programId, provider );
        setProgram( programInner );
    }, [ wallet ] );

    return program;
}