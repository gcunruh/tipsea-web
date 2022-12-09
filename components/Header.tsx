import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Navbar } from "flowbite-react";

export default function Header() {
  return (
    <Navbar
      fluid={false}
      rounded={false}
      className="bg-transparent md:px-0 pt-2 pb-4 md:pb-5 [&>div]:min-w-full max-w-full relative"
    >
      <Navbar.Brand className="cursor-pointer">
        <Link href="/">
            <div className="flex flex-row gap-1">
        <img alt="logo" className="h-12 w-12 md:h-14 md:w-14" src="./tipsea_logo.svg" />
        <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">
          Tipsea
        </span>
        </div>
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2 text-cyan-900">
        <div>
          <WalletMultiButton />
        </div>
        <Navbar.Toggle className="text-cyan-900 border border-cyan-900 border-t-1 hover:bg-cyan-900 hover:text-neutral-200 border-l-1 border-r-4 border-b-4 ml-2 px-2"/>
      </div>
      <Navbar.Collapse className="mt-2 md:mt-0 rounded-md border border-t-1 border-cyan-900 border-l-1 border-r-4 border-b-4 px-4 md:px-1 pb-4 md:py-1 md:items-center [&>ul]:space-x-0">
        <Link
          href="/"
        >
            <div className="rounded-md hover:bg-cyan-900 hover:text-neutral-200 py-2 px-3 cursor-pointer">
          Order
          </div>
        </Link>
        <Link
          href="/redeem"
        >
            <div className="rounded-md hover:bg-cyan-900 hover:text-neutral-200 py-2 px-3 cursor-pointer">
          Redeem
          </div>
        </Link>
        <Link
          href="/faq"
        >
            <div className="rounded-md hover:bg-cyan-900 hover:text-neutral-200 py-2 px-3 cursor-pointer">
            FAQ
          </div>
        </Link>
        <a
          href="https://t.me/+58fH0cwGotc0MjFh"
          target="_blank"
          rel="noreferrer"
        >
            <div className="rounded-md hover:bg-cyan-900 hover:text-neutral-200 py-2 px-3 cursor-pointer">
            Contact
          </div>
        </a>
      </Navbar.Collapse>
    </Navbar>
  );
}
