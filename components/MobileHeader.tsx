import { HomeIcon } from "@heroicons/react/solid";
import { MailIcon } from "@heroicons/react/solid";
import { ViewBoardsIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export default function MobileHeader() {
    const router = useRouter();

    return (
        <div className="rounded-t-md fixed md:invisible bottom-[-1px] py-2 bg-cyan-900 z-50 w-full text-[#e5e5e5]">
            <div className="w-full flex flex-row justify-evenly pt-1">
                <div onClick={() => router.push("/")} className="flex flex-col items-center w-20 text-xs cursor-pointer border border-white rounded-lg py-2 bg-white bg-opacity-10">
                    <HomeIcon className="w-7 h-7 stroke-[#e5e5e5]"/>
                    <div>
                        Home
                    </div>
                </div>
                <div className="flex flex-col items-center w-20 text-xs cursor-pointer border border-transparent rounded-lg py-2">
                    <MailIcon className="w-7 h-7 stroke-[#e5e5e5]" />
                    <div>
                        Notify Me
                    </div>
                </div>
                <div className="flex flex-col items-center w-20 text-xs cursor-pointer border border-transparent rounded-lg py-2">
                    <ViewBoardsIcon className="w-7 h-7 stroke-[#e5e5e5]" />
                    <div>
                        Leaderboard
                    </div>
                </div>
            </div>
        </div>
    )
}