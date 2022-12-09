import * as anchor from "@project-serum/anchor";
import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  MINT_SIZE,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { PROGRAM_ADDRESS } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey, Keypair } from "@solana/web3.js";

const USDC_MINT = new PublicKey(String(process.env.NEXT_PUBLIC_USDC_MINT));
const TOKEN_METADATA_PROGRAM_ID = new PublicKey(PROGRAM_ADDRESS);
const TIPSEA = new PublicKey(String(process.env.NEXT_PUBLIC_TIPSEA));
const TIPSEA_COLLECTION = new PublicKey(String(process.env.NEXT_PUBLIC_TIPSEA_COLLECTION));

const admin_wallet = Keypair.fromSecretKey(
  Uint8Array.from( JSON.parse(process.env.NEXT_PUBLIC_TIPSEA_PRIVATE) )
);

const getMetadata = async (
  mint: anchor.web3.PublicKey
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
};

const getMasterEdition = async (
  mint: anchor.web3.PublicKey
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
};

export async function createTipsea(
  program: Program<Idl>,
  uri: string,
  name: string | undefined,
  symbol: string | undefined,
  to: string
) {
  const programId = program.programId;
  const provider = program?.provider as AnchorProvider;

  const fundSeeds = [Buffer.from("fund"), USDC_MINT.toBuffer()];

  const [fundPda, _fundBump] = await anchor.web3.PublicKey.findProgramAddress(
    fundSeeds,
    programId
  );

  const fromAta = await getAssociatedTokenAddress(
    USDC_MINT,
    provider.wallet.publicKey,
    true,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  const mintKey = anchor.web3.Keypair.generate();

  const NftTokenAccount = await getAssociatedTokenAddress(
    mintKey.publicKey,
    new PublicKey(to)
  );

  const metadataAddress = await getMetadata(mintKey.publicKey);
  const masterEdition = await getMasterEdition(mintKey.publicKey);
  const collectionMetadataAddress = await getMetadata( TIPSEA_COLLECTION);
  const collectionMasterEdition = await getMasterEdition( TIPSEA_COLLECTION);

  const lamports: number =
    await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );

  let tx = new anchor.web3.Transaction();

  tx.add(
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: provider.wallet.publicKey,
      newAccountPubkey: mintKey.publicKey,
      space: MINT_SIZE,
      programId: TOKEN_PROGRAM_ID,
      lamports,
    }),
    createInitializeMintInstruction(
      mintKey.publicKey,
      0,
      provider.wallet.publicKey,
      provider.wallet.publicKey
    ),
    createAssociatedTokenAccountInstruction(
      provider.wallet.publicKey,
      NftTokenAccount,
      new PublicKey(to),
      mintKey.publicKey
    )
  );

  tx.add(
    await program.methods
      .createTipsea(uri, name ? name : "Tipsea", symbol ? symbol : "TIPSEA", TIPSEA)
      .accounts({
        mintAuthority: provider.wallet.publicKey,
        mint: mintKey.publicKey,
        tokenAccount: NftTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        metadata: metadataAddress,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        payer: provider.wallet.publicKey,
        fromAccount: fromAta,
        fund: fundPda,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        masterEdition: masterEdition,
        collectionMint: TIPSEA_COLLECTION,
        collectionMetadata: collectionMetadataAddress,
        collectionMasterEdition: collectionMasterEdition,
        tipseaAdmin: admin_wallet.publicKey
      })
      .instruction()
  );

  const final = await provider.sendAndConfirm(tx, [mintKey, admin_wallet]);

  return final;
}
