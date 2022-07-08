import fx from "fireworks";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, createInitializeMintInstruction, createAssociatedTokenAccountInstruction, MINT_SIZE } from "@solana/spl-token";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, WalletContextState } from "@solana/wallet-adapter-react";
import {
    Program, AnchorProvider, SystemProgram, web3
} from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from "../../idl.json";


import Box from "../Box";
import Button from "../Button";

type Fields = {
    to: string;
    message: string;
}

type Order = {
    id: number;
    name: string;
    imageSrc: string;
}

type SendProps = {
    fields: Fields;
    orderOptions: Array<Order>;
    selectedOrder: number;
    nextStep: () => void;
    prevStep: () => void;
    mintAddress: string;
}

const SendLoading = () => {
    return (
        <div className="flex flex-col justify-center">
            <img className="w-24" src="./mail.gif" />
            <div className="my-2 font-semibold">
                Sending...
            </div>
        </div>

    )
}

export default function Send({ fields, orderOptions, selectedOrder, nextStep, prevStep, mintAddress }:SendProps) {
    const [loading, setLoading] = useState(false);
    const programID = new PublicKey(idl.metadata.address);
    const { SystemProgram } = web3;
    let range = (n: number) => [...new Array(n)]
    let x = 0
    const { publicKey, wallet, signTransaction, signAllTransactions } = useWallet();

    useEffect(() => {
        fireworks()
        setTimeout(() => {
            fireworks()
        }, 1000)
    }, []);

    if (!wallet || !publicKey || !signTransaction || !signAllTransactions) {
        return (
            <div>
                Error: No wallet connected!!
            </div>
        );
    }
    const signerWallet = {
        publicKey: publicKey,
        signTransaction: signTransaction,
        signAllTransactions: signAllTransactions,
    };

    async function fireworks() {
        range(6).map(() => 
            fx({
                x: Math.random() * window.innerWidth / 1.15,
                y: Math.random() * 400,
                colors: ['#014E68', '#3E5C68', '#4091B1']
            })
        )
    }

    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */
        const network = "https://wild-spring-violet.solana-devnet.quiknode.pro/a9a498c23b69394b859564240737cdc608f4e918/";
        const connection = new Connection(network, "processed");

        const provider = new AnchorProvider(
            connection, signerWallet, { preflightCommitment: "processed" },
        );
        return provider;
    }

    const transferNFT = async (toPubkey: string, mintAddress: string) => {
        const provider = await getProvider();
        const program = new Program(idl as any, programID, provider)

        const fromAta = await getAssociatedTokenAddress(
            new PublicKey(mintAddress),
            signerWallet.publicKey
        )

        const toAta = await getAssociatedTokenAddress(
            new PublicKey(mintAddress), // mint
            new PublicKey(toPubkey) // owner
        );

        console.log(`Mint Key: ${mintAddress}`);
        console.log(`fromAta: ${fromAta}`);
        console.log(`toAta: ${toAta}`);

    const mint_tx = new web3.Transaction().add(
      createAssociatedTokenAccountInstruction(
        signerWallet.publicKey, toAta, new PublicKey(toPubkey), new PublicKey(mintAddress)
      )
    )

    await AnchorProvider.env().sendAndConfirm(mint_tx, []);

    await program.rpc.sendNft(
        {
            accounts: {
                sender: signerWallet.publicKey,
                from: fromAta,
                receiver: toAta,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: web3.SYSVAR_RENT_PUBKEY,
            }
        }
    )

    }


    async function handleSubmit() {
        if (mintAddress !== "") {
            setLoading(true);
            await transferNFT(fields.to, mintAddress);
            nextStep();
        } else {
            console.log("Invalid mint address!")
        }
    }

    return (
        <>
            {
                loading ? 
                <SendLoading />
                :
            <div className="flex flex-col mb-24">
                <div className="font-semibold mb-4">
                    Mint Successful!
                </div>
                <Box>
                    <div className="flex flex-col mb-2 md:mb-6">
                        <div className="text-right text-gray-400 mr-4 md:mr-2 my-2 md:my-0">
                            I&apos;m a NFT!
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <img className="w-full md:w-1/2 px-4 md:px-6" src={orderOptions.find(element => element.id === selectedOrder)?.imageSrc} />
                            <div className="w-full md:w-1/2 px-4 md:px-0 my-4 md:my-0">
                                <label className="mt-1 block text-sm font-bold text-cyan-900">
                                    To
                                </label>
                                <div className="text-base mt-1 mb-4 font-medium">
                                    {fields.to}
                                </div>
                                <label className="mt-1 block text-sm font-bold text-cyan-900">
                                    Name
                                </label>
                                <div className="text-base mt-1 mb-4 font-medium">
                                    {orderOptions.find(element => element.id === selectedOrder)?.name}
                                </div>
                                <label className="mt-1 block text-sm font-bold text-cyan-900">
                                    Message
                                </label>
                                <div className="text-base mt-1 mb-4 font-medium">
                                    {fields.message}
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
                <div className="my-2 md:my-0 w-full">
                    <div>
                        <div className="w-full">
                            <div className={"w-full md:w-44 " + ((fields.to.length > 0 && fields.message.length > 0) ? "" : "invisible")}>
                                <Button style="filled" onClick={handleSubmit}>
                                    Send NFT
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}