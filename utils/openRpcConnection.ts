import { Connection } from "@solana/web3.js";

export function openRpcConnection() {
    //120 sec timeout
    const CONNECTION_CONFIG_OPTIONS = { confirmTransactionInitialTimeout: 120000 };
    return new Connection(String(process.env.NEXT_PUBLIC_RPC_ENDPOINT), CONNECTION_CONFIG_OPTIONS);
}