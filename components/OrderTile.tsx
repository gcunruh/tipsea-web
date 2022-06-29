import { CheckCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";

type OrderTileProps = {
    id: number;
    name: string;
    onClick: (id: number) => any;
    imageSrc: string;
    selected?: boolean;
}

const unSelectedStyles = "group-hover:bg-cyan-900 group-hover:bg-opacity-50"
const selectedStyles = "bg-cyan-800"


export default function OrderTile({ id, name, onClick, imageSrc, selected }: OrderTileProps) {
    return (
        <div onClick={() => onClick(id)} className="group relative px-2 py-3 md:p-4 rounded-md">
            <div className="absolute right-0 top-0 z-40">
                <CheckCircleIcon className={"h-12 w-12 text-white bg-neutral-200 rounded-full " + (selected ? selectedStyles : unSelectedStyles) }/>
            </div>
            <Image src={imageSrc} layout="responsive" height={50} width={50} className="h-auto"/>
            <div className="my-1 font-medium">
                {name}
            </div>
        </div>
    )
}

OrderTile.defaultProps = {
    selected: false,
}