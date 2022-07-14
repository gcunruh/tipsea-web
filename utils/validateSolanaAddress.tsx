import { PublicKey } from "@solana/web3.js";

import { SolanaAddressValidationError } from "./errors";

export const validateSolanaAddress = (address: string) => {
    try {
        let pubkey = new PublicKey(address)
        let isSolana = PublicKey.isOnCurve(pubkey.toBuffer())
        return isSolana
    } catch (error) {
        throw new SolanaAddressValidationError('Unknown Solana Address Format')
    }
}