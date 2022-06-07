import Box from "../Box";
import Button from "../Button";
import Loading from "../Loading";

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
    return (
        <>
            <div className="flex flex-col mb-24">
                <div className="font-semibold mb-4">
                    NFT Preview
                </div>
                <Box>
                    <div className="flex flex-col mb-6">
                        <div className="text-right text-gray-400 mr-2">
                            I&apos;m a future NFT :-)
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
                <div className="flex flex-row justify-between mt-2">
                    <div className="text-gray-400 w-2/5">
                        We mint the NFT with your personalized message in the metadata
                    </div>
                    <div>
                        <div className="flex flex-row justify-end">
                            <div className={"mr-4 w-44 " + (1 < 0 ? "invisible" : "")}>
                                <Button style="default" onClick={prevStep}>
                                    Previous
                                </Button>
                            </div>
                            <div className={" " + ((fields.to.length > 0 && fields.message.length > 0) ? "" : "invisible")}>
                                <Button style="filled" onClick={nextStep}>
                                    Mint for 0.07 SOL
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Loading /> */}
        </>
    )
}