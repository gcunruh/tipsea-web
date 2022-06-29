import Image from "next/image";
import { useState } from "react";
import {
  Program, AnchorProvider, SystemProgram, web3
} from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from "../../idl.json";

import Box from "../Box";
import Button from "../Button";
import Loading from "../Loading";
import { useWallet } from "@solana/wallet-adapter-react";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, createInitializeMintInstruction, createAssociatedTokenAccountInstruction, MINT_SIZE } from "@solana/spl-token";
import {v4 as uuidv4} from 'uuid';

import AWS from "aws-sdk";

type Fields = {
    to: string;
    message: string;
}

type Order = {
    id: number;
    name: string;
    imageSrc: string;
}

type MintProps = {
    fields: Fields;
    orderOptions: Array<Order>;
    selectedOrder: number;
    nextStep: () => void;
    prevStep: () => void;
}

export default function Mint({ fields, orderOptions, selectedOrder, nextStep, prevStep }:MintProps) {
    const [uuid, setUuid] = useState(uuidv4());
    const [loading, setLoading] = useState(false);
    const programID = new PublicKey(idl.metadata.address);
    const creatorKey = new PublicKey("4m5Jv1G2Ch2irCNYRwg9tY22Q5psNnJkcTM9qcg7nLSo");
    const { SystemProgram } = web3;
    const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
      "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
    );
    const { publicKey, wallet, signTransaction, signAllTransactions } = useWallet();
    if (!wallet || !publicKey || !signTransaction || !signAllTransactions) {
        return(
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

    async function uploadMetadata() {
        const S3_BUCKET = 'tipsea'
        const REGION = 'us-west-2'

        const s3 = new AWS.S3({
            accessKeyId: "AKIA6C5ZLOVI2QE5B56B",
            secretAccessKey: "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"
        });

        var dictstring = JSON.stringify(
            {
                name: orderOptions.find(element => element.id === selectedOrder)?.name,
                symbol: orderOptions.find(element => element.id === selectedOrder)?.name.toUpperCase(),
                description: fields.message,
                seller_fee_basis: 420,
                external_url: "https://tipsea-web.vercel.app/",
                edition: "1",
                background_color: "000000",
                atrributes: [
                    {
                        trait_type: "Sender",
                        value: publicKey
                    },
                    {  
                        trait_type: "Receiver",
                        value: fields.to
                    }

                ],
                properties: {
                    category: "image",
                    creators: [{
                        address: publicKey,
                        share: 100
                    }],
                    "files": [{
                        uri: "https://tipsea.s3.us-west-2.amazonaws.com/"+orderOptions.find(element => element.id === selectedOrder)?.name.replace(" ", "_").toLowerCase()+".png",
                        type: "image/png"
                    }]
                },
                "image": "https://tipsea.s3.us-west-2.amazonaws.com/"+orderOptions.find(element => element.id === selectedOrder)?.name.replace(" ", "_").toLowerCase()+".png",
            }
        )

        var buf = Buffer.from(dictstring)

        const params = {
            Body: buf,
            Bucket: S3_BUCKET,
            Key: uuid+".json",
        }

        s3.putObject(params, function(err, data) {
        if (err) {
            return alert("There was an error creating: " + err.message);
        }
        alert("Successfully created.");
        });

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

    const getMetadata = async (
      mint: web3.PublicKey
    ): Promise<web3.PublicKey> => {
      return (
        await web3.PublicKey.findProgramAddress(
          [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )
      )[0];
    };

    const getMasterEdition = async (
      mint: web3.PublicKey
    ): Promise<web3.PublicKey> => {
      return (
        await web3.PublicKey.findProgramAddress(
          [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            Buffer.from("edition"),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )
      )[0];
    };

    async function mint_nft() {
        const provider = await getProvider();
        const program = new Program(idl as any, programID, provider)
        const mintKey: web3.Keypair = web3.Keypair.generate();
        

        const NftTokenAccount = await getAssociatedTokenAddress(
            mintKey.publicKey,
            signerWallet.publicKey
        )
        console.log("NFT Account: ", NftTokenAccount.toBase58());

            const lamports: number =
      await program.provider.connection.getMinimumBalanceForRentExemption(
        MINT_SIZE
      );

        const mint_tx = new web3.Transaction().add(
            web3.SystemProgram.createAccount({
            fromPubkey: signerWallet.publicKey,
            newAccountPubkey: mintKey.publicKey,
            space: MINT_SIZE,
            programId: TOKEN_PROGRAM_ID,
            lamports,
            }),
            createInitializeMintInstruction(
            mintKey.publicKey,
            0,
            signerWallet.publicKey,
            signerWallet.publicKey
            ),
            createAssociatedTokenAccountInstruction(
            signerWallet.publicKey,
            NftTokenAccount,
            signerWallet.publicKey,
            mintKey.publicKey
            )
        );
    
        const res = await program.provider.sendAndConfirm!(mint_tx, [mintKey])
        console.log(
            await program.provider.connection.getParsedAccountInfo(mintKey.publicKey)
        );

        console.log("Account: ", res);
        console.log("Mint key: ", mintKey.publicKey.toString());
        console.log("User: ", signerWallet.publicKey.toString());

        const metadataAddress = await getMetadata(mintKey.publicKey);
        const masterEdition = await getMasterEdition(mintKey.publicKey);

        const tx = await program.rpc.mintNft(
            creatorKey,
            `https://tipsea.s3.us-west-2.amazonaws.com/${uuid}.json`,
            orderOptions.find(element => element.id === selectedOrder)?.name,
            "TIPSEA",
            {
                accounts: {
                    mintAuthority: signerWallet.publicKey,
                    mint: mintKey.publicKey,
                    tokenAccount: NftTokenAccount,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    metadata: metadataAddress,
                    tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                    payer: signerWallet.publicKey,
                    systemProgram: SystemProgram.programId,
                    rent: web3.SYSVAR_RENT_PUBKEY,
                    masterEdition: masterEdition
                }
            }

        )
    }

    async function handleSubmit() {
        // setLoading(true);
        // await uploadMetadata();
        // await mint_nft();
        nextStep();
    }

    return (
        <>
            {
                loading ? 
                <Loading />
                : 
<div className="flex flex-col mb-24">
                <div className="font-semibold mb-4">
                    NFT Preview
                </div>
                <Box>
                    <div className="flex flex-col mb-2 md:mb-6">
                        <div className="text-right text-gray-400 mr-4 md:mr-2 my-2 md:my-0">
                            I&apos;m a future NFT!
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
                <div className="flex flex-col-reverse md:flex-row justify-between mt-2">
                    <div className="text-gray-400 my-4 md:my-0 w-full md:w-2/5">
                        We mint the NFT with your personalized message in the metadata
                    </div>
                    <div>
                        <div className="flex flex-col md:flex-row justify-end">
                            <div className={"mr-4 w-full md:w-44 " + (1 < 0 ? "invisible" : "")}>
                                <Button style="default" onClick={prevStep}>
                                    Previous
                                </Button>
                            </div>
                            <div className={" " + ((fields.to.length > 0 && fields.message.length > 0) ? "" : "invisible")}>
                                <Button style="filled" onClick={handleSubmit}>
                                    Mint for 0.07 SOL
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