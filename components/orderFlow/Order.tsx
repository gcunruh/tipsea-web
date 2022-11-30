import Button from "../Button";
import OrderTile from "../OrderTile";

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
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {orderOptions.map((order, orderIdx) => (
                    <OrderTile key={order.id} id={order.id} name={order.name} imageSrc={order.imageSrc} selected={order.id === selectedOrder ? true : false} onClick={handleOrderSelect} />
                ))

                }
            </div>
            {/* <div className="flex flex-row justify-center md:justify-end mt-2">
                <div className={"w-full md:w-44 " + (selectedOrder < 0 ? "invisible" : "")}>
                    <Button style="filled" onClick={nextStep}>
                        Next
                    </Button>
                </div>
            </div> */}
        </>
    )
}