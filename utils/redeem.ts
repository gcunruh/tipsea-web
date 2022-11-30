import * as anchor from "@project-serum/anchor";
import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  MINT_SIZE,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PROGRAM_ADDRESS } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";
import { Nft } from "../pages/redeem";
import { Wallet, WalletContextState } from "@solana/wallet-adapter-react";
import { getOrCreateAssociatedTokenAccount } from "./getOrCreateAssociatedTokenAccount";

const USDC_MINT = new PublicKey(String(process.env.NEXT_PUBLIC_USDC_MINT));
const TOKEN_METADATA_PROGRAM_ID = new PublicKey(PROGRAM_ADDRESS);
const TIPSEA = new PublicKey(String(process.env.NEXT_PUBLIC_TIPSEA));

const getMetadata = async (
    mint: anchor.web3.PublicKey
  ): Promise<anchor.web3.PublicKey> =>
  {
    return (
      await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from( "metadata" ),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )
    )[ 0 ];
  };

export async function redeem(
  program: Program<Idl>,
  signTransaction: WalletContextState[ "signTransaction" ],
  toRedeem: Nft[],
) {
  const programId = program.programId;
  const provider = program?.provider as AnchorProvider;

  const fundSeeds = [Buffer.from("fund"), USDC_MINT.toBuffer()];

  const [fundPda, _fundBump] = await anchor.web3.PublicKey.findProgramAddress(
    fundSeeds,
    programId
  );

  const toAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    provider.wallet.publicKey,
    USDC_MINT,
    provider.wallet.publicKey,
    signTransaction
  );

  let tx = new anchor.web3.Transaction();

  for (let i = 0; i < toRedeem.length; i++) {
    const nft = toRedeem[i]
    const NftTokenAccount = await getAssociatedTokenAddress(
        nft.mint,
        provider.wallet.publicKey
      );
    const metadataAddress = await getMetadata(nft.mint);
    tx.add(
        await program.methods
          .redeem(
            _fundBump
          )
          .accounts( {
            signer: provider.wallet.publicKey,
            toAccount: toAta.address,
            tokenMint: USDC_MINT,
            fund: fundPda,
            mint: nft.mint,
            tokenAccount: NftTokenAccount,
            metadataAccount: metadataAddress,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          } )
          .instruction()
      );
  }

  const final = await provider.sendAndConfirm(tx);

  return final;
}
