type LoadingProps = {
    text?: string;
}

export default function Loading({ text }:LoadingProps) {
    return (
        <div className="flex flex-col justify-center">
            <img className="w-24" src="./trees.gif" />
            <div className="my-2 font-semibold">
                {text}
            </div> 
        </div>
    )
}

Loading.defaultProps = {
    text: "Loading..."
}