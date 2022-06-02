export default function Header() {

    return (
        <header className="flex flex-row justify-between items-center py-2">
            <div className="flex flex-row items-center">
                <img className="h-14 w-14" src="./tipsea_logo.svg" />
                <div className="mx-1 font-press-start text-cyan-900">
                    Tipsea
                </div>
            </div>
            <nav className="flex flex-row gap-6 font-medium mr-2">
                <div>
                    Notify Me
                </div>
                <div>
                    Leaderboard
                </div>
            </nav>
        </header>
    )
}