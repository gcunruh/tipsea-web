import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";

export const transferNFT = async (from: string, to: string) => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Get the token account of the fromWallet, create it if it does not exist
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        from,
        mint,
        from
    );

    // Get the token account of the toWallet, create it if it does not exist
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        from,
        mint,
        to,
    );

    // Transfer to toTokenAccount
    let signature = await transfer(
        connection,
        from,
        fromTokenAccount.address,
        toTokenAccount.address,
        from,
        1000000000,
        []
    );
    console.log('transfer tx:', signature);
}