export default function Footer() {

    return (
        <footer className="w-full text-center flex flex-col gap-6 pt-44 pb-10 bg-neutral-200">
            <div className="font-press-start text-sm">
                Technology is Art
            </div>
            <a href="https://divination.dev" target="_blank" rel="noreferrer" className="align-middle text-center items-center">
                <img className="inline-block mr-2 h-7 w-7" src="./divination_logo_tipsea.png" />
                Divination © 2022
            </a>
            <div className="align-middle text-center">
                Built on
                <img className="inline-block w-32 h-auto ml-2" src="./solana_tipsea.png" />
            </div>
        </footer>
    )
}