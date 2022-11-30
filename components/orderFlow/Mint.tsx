import Image from "next/image";
import { useState } from "react";
import { Connection, PublicKey } from '@solana/web3.js';
import useProgram from "../../hooks/useProgram";
import Box from "../Box";
import Button from "../Button";
import Loading from "../Loading";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { PROGRAM_ADDRESS } from '@metaplex-foundation/mpl-token-metadata';
import { v4 as uuidv4 } from 'uuid';
import { Idl, Program } from "@project-serum/anchor";

import AWS from "aws-sdk";
import { createTipsea } from "../../utils/createTipsea";

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
    loading: boolean,
    wallet: Wallet,
    publicKey: PublicKey
}

export default function Mint({ fields, orderOptions, selectedOrder, loading, wallet, publicKey }: MintProps) {
    if (!wallet || !publicKey) {
        return (
            <div>
                Error: No wallet connected!!
            </div>
        );
    }

    return (
        <>
            {
                loading ?
                    <div className="w-full text-center flex flex-col items-center">
                    <Loading />
                    </div>
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
                            {/* <div>
                                <div className="flex flex-col md:flex-row justify-end">
                                    <div className={"mr-4 w-full md:w-44 " + (1 < 0 ? "invisible" : "")}>
                                        <Button style="default" onClick={prevStep}>
                                            Previous
                                        </Button>
                                    </div>
                                    <div className={" " + ((fields.to.length > 0 && fields.message.length > 0) ? "" : "invisible")}>
                                        <Button style="filled" onClick={handleSubmit}>
                                            Mint for 8 USDC
                                        </Button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
            }
        </>
    )
}