export default function Footer() {

    return (
        <footer className="w-full text-center flex flex-col gap-6">
            <div className="font-press-start text-sm">
                Technology is Art
            </div>
            <div className="align-middle text-center items-center">
                <img className="inline-block mr-2 h-7 w-7" src="./divination_logo_tipsea.png" />
                Divination © 2022
            </div>
            <div className="align-middle text-center">
                Built on
                <img className="inline-block w-32 h-auto ml-2" src="./solana_tipsea.png" />
            </div>
        </footer>
    )
}