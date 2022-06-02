type PrimaryButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    style: "default" | "filled";
}

export const defaultStyles = "my-1 inline-flex px-4 py-2 items-center bg-transparent shadow-sm block w-full sm:text-sm border border-t-1 border-cyan-900 border-l-1 border-r-4 border-b-4 rounded-md"

export const filledStyles = "my-1 inline-flex px-4 py-2 items-center bg-cyan-900 text-neutral-200 shadow-sm block w-full sm:text-sm border border-t-1 border-[#003648] border-l-1 border-r-4 border-b-4 rounded-md"

export default function Button({ onClick, children, style }: PrimaryButtonProps) {
    return (
        <button
            type="button"
            className={style === "filled" ? filledStyles : defaultStyles}
        >
            {children}
        </button>
    )
}
