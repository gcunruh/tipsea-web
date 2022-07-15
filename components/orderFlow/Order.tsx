import { useEffect, useRef } from "react";
import Button from "../Button";
import OrderTile from "../OrderTile";
import { ArrowDownIcon } from "@heroicons/react/outline";

type Order = {
    id: number;
    name: string;
    imageSrc: string;
}

type OrderProps = {
    orderOptions: Array<Order>;
    selectedOrder: number;
    handleOrderSelect: (params: any) => any;
    nextStep: () => void;
}

export default function Order({ orderOptions, selectedOrder, handleOrderSelect, nextStep}: OrderProps) {
    const scrollToRef = useRef<HTMLButtonElement | null>(null);

   const executeScroll = () => {
    if (scrollToRef.current != null) {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
   };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {orderOptions.map((order, orderIdx) => (
                    <OrderTile key={order.id} id={order.id} name={order.name} imageSrc={order.imageSrc} selected={order.id === selectedOrder ? true : false} onClick={handleOrderSelect} />
                ))

                }
            </div>
            <div className="flex flex-row justify-center md:justify-end mt-2">
                <div className={"w-full md:w-44 " + (selectedOrder < 0 ? "invisible" : "")}>
                    <Button style="filled" onClick={nextStep} scrollRef={scrollToRef} >
                        Next
                    </Button>
                </div>
            </div>
            {
                selectedOrder < 0 ? 
                null
                :
                <div onClick={() => executeScroll()} className="fixed right-5 bottom-24 md:bottom-6 md:right-6 rounded-full border-2 border-cyan-900 w-14 h-14 z-50 bg-white flex flex-row items-center justify-center">
                    <ArrowDownIcon className="w-7 h-7 stroke-2"/>
                </div>
            }
        </>
    )
}