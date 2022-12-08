import { CheckCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Box from "./Box";

type OrderTileProps = {
    id: number;
    name: string;
    from: string;
    onClick: () => any;
    imageSrc: string;
    message: string;
    selected?: boolean;
    redeemed?: boolean;
}

const unSelectedStyles = "group-hover:bg-cyan-900 group-hover:bg-opacity-50"
const selectedStyles = "bg-cyan-800"


export default function RedeemTile({ id, name, from, onClick, imageSrc, message, selected, redeemed }: OrderTileProps) {

    return (
        <Box>
        <div onClick={onClick} className="group relative px-2 py-3 md:p-4 rounded-md">
            {!redeemed &&
                <div className="absolute right-0 top-0 z-40">
                    <CheckCircleIcon className={"h-12 w-12 text-white bg-neutral-200 rounded-full " + (selected ? selectedStyles : unSelectedStyles) }/>
                </div>
            }
            <div className="relative">
            <Image alt="drink" src={imageSrc} layout="responsive" height={50} width={50} className={`h-auto ${redeemed && "brightness-50"}`}/>
            {redeemed &&
                <div className="text-3xl text-white font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45">
                    REDEEMED
                </div>
            }
            </div>
            <div className="my-2 font-medium">
                {name}
            </div>
            <div className="my-2">
                From: <span className="font-medium break-words">{from.includes(".sol") ? from : (from.substring(0, 4) + "..") + from.slice(-4)}</span>
            </div>
            <div className="my-2">
                Message: <span className="font-medium">{message}</span>
            </div>
        </div>
        </Box>
    )
}

RedeemTile.defaultProps = {
    selected: false,
    redeemed: false
}