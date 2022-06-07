import { clusterApiUrl, Connection, Transaction, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getOrCreateAssociatedTokenAccount } from './getOrCreateAssociatedTokenAccount'
import { createTransferInstruction } from './createTransferInstructions'

export const transferNFT = async (toPubkey: string) => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const { publicKey, signTransaction, sendTransaction} = useWallet();

    try {
        if (!publicKey || !signTransaction) throw new WalletNotConnectedError()
        const toPublicKey = new PublicKey(toPubkey)
        const mint = new PublicKey('MINT ADDRESS')

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            publicKey,
            mint,
            publicKey,
            signTransaction
        )

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            publicKey,
            mint,
            toPublicKey,
            signTransaction
        )

        const transaction = new Transaction().add(
            createTransferInstruction(
                fromTokenAccount.address,
                toTokenAccount.address,
                publicKey,
                1 * LAMPORTS_PER_SOL,
                [],
                TOKEN_PROGRAM_ID
            )
        )

        const blockHash = await connection.getLatestBlockhash()
        transaction.feePayer = await publicKey
        transaction.recentBlockhash = await blockHash.blockhash
        const signed = await signTransaction(transaction)

        await connection.sendRawTransaction(signed.serialize())

    } catch (error: any) {
        Error("Ekkkkkk whyyyyy!")
    }

}