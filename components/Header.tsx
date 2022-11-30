import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

export default function Header() {

    return (
        <header className="flex flex-row justify-between items-center py-2">
            <Link href="/">
                <div className="flex flex-row items-center cursor-pointer">
                    <img className="h-14 w-14" src="./tipsea_logo.svg" />
                    <div className="mx-1 font-press-start text-cyan-900">
                        Tipsea
                    </div>
                </div>
            </Link>
            <nav className="flex flex-row gap-6 font-medium mr-2 items-center">
                <div className="hidden md:inline-block">
                <Link  href="/">
                    Order
                </Link>
                </div>
                <div className="hidden md:inline-block">
                <Link  href="/redeem">
                    Redeem
                </Link>
                </div>
                <div>
                    <WalletMultiButton />
                </div>
            </nav>
        </header>
    )
}