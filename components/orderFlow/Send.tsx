import fx from "fireworks";
import { useEffect } from "react";

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

export default function Send({ fields, orderOptions, selectedOrder, nextStep, prevStep }:SendProps) {
    let range = (n: number) => [...new Array(n)]
    let x = 0

    async function fireworks() {
        range(6).map(() => 
            fx({
                x: Math.random() * window.innerWidth / 1.15,
                y: Math.random() * 400,
                colors: ['#014E68', '#3E5C68', '#4091B1']
            })
        )
    }

    useEffect(() => {
        fireworks()
        setTimeout(() => {
            fireworks()
        }, 1000)
    }, []);




    return (
        <>
            <div className="flex flex-col mb-24">
                <div className="font-semibold mb-4">
                    Mint Successful!
                </div>
                <Box>
                    <div className="flex flex-col mb-6">
                        <div className="text-right text-gray-400 mr-2">
                            I&apos;m a NFT :-)
                        </div>
                        <div className="flex flex-row">
                            <img className="w-1/2 px-6" src={orderOptions.find(element => element.id === selectedOrder)?.imageSrc} />
                            <div className="w-1/2">
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
                <div className="flex flex-row justify-end mt-2">
                    <div>
                        <div className="flex flex-row justify-end">
                            <div className={"w-44 " + ((fields.to.length > 0 && fields.message.length > 0) ? "" : "invisible")}>
                                <Button style="filled" onClick={nextStep}>
                                    Send NFT
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SendLoading />
        </>
    )
}