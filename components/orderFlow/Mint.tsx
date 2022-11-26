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
import { TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createInitializeMintInstruction, MINT_SIZE, ASSOCIATED_TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { PROGRAM_ADDRESS } from '@metaplex-foundation/mpl-token-metadata';
import { v4 as uuidv4 } from 'uuid';

import AWS from "aws-sdk";

const TOKEN_METADATA_PROGRAM_ID = new PublicKey( PROGRAM_ADDRESS );

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
    setMintAddress: (arg0: string) => void;
}

export default function Mint({ fields, orderOptions, selectedOrder, nextStep, prevStep, setMintAddress }: MintProps) {
    const [uuid, setUuid] = useState(uuidv4());
    const [loading, setLoading] = useState(false);
    const programID = new PublicKey(String(process.env.NEXT_PUBLIC_PROGRAM_ID));
    const creatorKey = new PublicKey("Bw9yuLw62jk9Z2gjtNm8wdKkoYLZdPfJgDUrRNkTPVxM");
    const { SystemProgram } = web3;
    const { publicKey, wallet, signTransaction, signAllTransactions } = useWallet();
    if (!wallet || !publicKey || !signTransaction || !signAllTransactions) {
        return (
            <div>
                Error: No wallet connected!!
            </div>
        );
    }

    async function uploadMetadata() {
        const S3_BUCKET = 'tipsea'

        AWS.config.update({ region: 'us-west-2' })

        const s3 = new AWS.S3({
            accessKeyId: String(process.env.NEXT_PUBLIC_S3_ACCESS_KEY),
            secretAccessKey: String(process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY)
        });

        var dictstring = {
            name: orderOptions.find(element => element.id === selectedOrder)?.name,
            symbol: orderOptions.find(element => element.id === selectedOrder)?.name.toUpperCase(),
            description: fields.message,
            seller_fee_basis: 0,
            external_url: "https://tipsea.xyz/",
            edition: "1",
            background_color: "000000",
            attributes: [
                {
                    trait_type: "Sender",
                    value: publicKey
                },
                {
                    trait_type: "Receiver",
                    value: fields.to
                },
                {
                    trait_type: "Redeemed",
                    value: "No"
                }
            ],
            properties: {
                category: "image",
                creators: [{
                    address: '8a2z19H17vyQ89rmtR5tATWkGFutJ5gBWre2fthXimHa',
                    share: 100
                    },
                    {
                        address: publicKey,
                        share: 0
                    }
                ],
                "files": [{
                    uri: "https://tipsea.s3.us-west-2.amazonaws.com/" + orderOptions.find(element => element.id === selectedOrder)?.name.replace(" ", "_").toLowerCase() + ".png",
                    type: "image/png"
                }]
            },
            "image": "https://tipsea.s3.us-west-2.amazonaws.com/" + orderOptions.find(element => element.id === selectedOrder)?.name.replace(" ", "_").toLowerCase() + ".png",
        }

        var buf = Buffer.from(JSON.stringify(dictstring))

        var data = {
            Bucket: S3_BUCKET,
            Key: `metadata/${uuid}.json`,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: "application/json",
            ACL: 'public-read'
        };

        s3.upload(data, function(err: any, data: any) {
            if (err) {
                console.log(err);
                console.log('Error uploading data: ', data);
            } else {
                console.log('Success!')
            }
        });

    }

    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */
        const network = String(process.env.NEXT_PUBLIC_RPC_ENDPOINT);
        const connection = new Connection(network, "processed");

        const provider = new AnchorProvider(
            connection, wallet, { preflightCommitment: "processed" },
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

        const lamports: number =
        await program.provider.connection.getMinimumBalanceForRentExemption(
          MINT_SIZE
        );
  
        const mint_tx = new anchor.web3.Transaction();


        const NftTokenAccount = await getAssociatedTokenAddress(
            mintKey.publicKey,
            signerWallet.publicKey
        )
        console.log("NFT Account: ", NftTokenAccount.toBase58());

        mint_tx.add(
            anchor.web3.SystemProgram.createAccount( {
              fromPubkey: wallet.publicKey,
              newAccountPubkey: mintKey.publicKey,
              space: MINT_SIZE,
              programId: TOKEN_PROGRAM_ID,
              lamports,
            } ),
            createInitializeMintInstruction(
              mintKey.publicKey,
              0,
              wallet.publicKey,
              wallet.publicKey
            ),
            createAssociatedTokenAccountInstruction(
              wallet.publicKey,
              NftTokenAccount,
              to_wallet.publicKey,
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

        await program.rpc.mintNft(
            `https://tipsea.s3.us-west-2.amazonaws.com/metadata/${uuid}.json`,
            orderOptions.find(element => element.id === selectedOrder)?.name,
            orderOptions.find(element => element.id === selectedOrder)?.name.toUpperCase(),
            {
                accounts: {
                    mintAuthority: signerWallet.publicKey,
                    mint: mintKey.publicKey,
                    tokenAccount: NftTokenAccount,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    metadata: metadataAddress,
                    tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                    payer: signerWallet.publicKey,
                    creator: creatorKey,
                    systemProgram: SystemProgram.programId,
                    rent: web3.SYSVAR_RENT_PUBKEY,
                    masterEdition: masterEdition
                }
            }

        )
        setMintAddress(new PublicKey(mintKey.publicKey).toString());
    }

    async function handleSubmit() {
        setLoading(true);
        await uploadMetadata();
        await mint_nft();
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
                                            Mint for 0.3 SOL
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