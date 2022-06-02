type BoxProps = {
    children: React.ReactNode;
};

export default function Box({ children }: BoxProps) {
    return (
        <div className="p-1 w-full h-fit rounded-md border border-t-1 border-cyan-900 border-l-1 border-r-4 border-b-4">
            {children}
        </div>
    )
}