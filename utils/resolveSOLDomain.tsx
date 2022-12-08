import {
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
} from "@bonfida/spl-name-service";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
export const SOL_TLD_AUTHORITY = new PublicKey(
    "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
  );

export const resolveSOLDomain = async (domain: string) => {
    try {
        const hashedName = await getHashedName(domain.replace(".sol", ""))
        const nameAccountKey = await getNameAccountKey(
            hashedName,
            undefined,
            SOL_TLD_AUTHORITY
        );
        const owner = await NameRegistryState.retrieve(
            new Connection("https://wandering-holy-cherry.solana-mainnet.quiknode.pro/5f2ada1c7661ca37f78b510bc30ab4bf7b220615/"),
            nameAccountKey
        );
        return owner.registry.owner.toBase58();

    } catch (error) {
        throw Error("NO NO NO")
    }

}