import {
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
} from "@bonfida/spl-name-service";

import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

export const resolveSOLDomain = async (domain: string) => {
    try {
        const hashedName = await getHashedName(domain.replace(".sol", ""))
        const nameAccountKey = await getNameAccountKey(
            hashedName,
            undefined,
            new PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx")
        );
        const owner = await NameRegistryState.retrieve(
            new Connection(clusterApiUrl("mainnet-beta")),
            nameAccountKey
        );
        return owner.registry.owner.toBase58();

    } catch (error) {
        return false
    }

}