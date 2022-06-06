import { CheckCircleIcon } from "@heroicons/react/solid";

type OrderTileProps = {
    id: number;
    onClick: (id: number) => any;
    imageSrc: string;
    selected?: boolean;
}

const unSelectedStyles = "group-hover:bg-cyan-900 group-hover:bg-opacity-50"
const selectedStyles = "bg-cyan-800"


export default function OrderTile({ id, onClick, imageSrc, selected }: OrderTileProps) {
    return (
        <div onClick={() => onClick(id)} className="group relative p-4 rounded-md">
            <div className="absolute right-0 top-0">
                <CheckCircleIcon className={"h-12 w-12 text-white bg-neutral-200 rounded-full " + (selected ? selectedStyles : unSelectedStyles) }/>
            </div>
            <img src={imageSrc} className="h-auto"/>
        </div>
    )
}

OrderTile.defaultProps = {
    selected: false,
}