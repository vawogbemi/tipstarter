/*
  This script demonstrates how to mint an additional compressed NFT to an existing tree and/or collection
  ---
  NOTE: A collection can use multiple trees to store compressed NFTs, as desired. 
  This example uses the same tree for simplicity.
*/
import { PublicKey, clusterApiUrl, Transaction, SystemProgram, sendAndConfirmTransaction, Keypair } from "@solana/web3.js";

// import custom helpers to mint compressed NFTs
import { WrapperConnection } from "@/tiplink/ReadApi/WrapperConnection";
import { mintCompressedNFTIxn } from "@/tiplink/utils/compression";

// load the env variables and store the cluster RPC url
import dotenv from "dotenv";

// import the NFTMetadata
import { createCompressedNFTMetadata, NFTMetadata } from '@/tiplink/onChainNftMetadata/onChainNFTs';
import { extractSignatureFromFailedTransaction } from "@/tiplink/utils/helpers";

// import fs to write the TipLink wallet URLs to a CSV file
import { TipLink } from "@tiplink/api";


dotenv.config();

const TIPLINK_MINIMUM_LAMPORTS = 1_000_000;

const createAndFundTipLink = async (
  connection: WrapperConnection,
  payer: Keypair,
  treeAddress: PublicKey,
  collectionMint: PublicKey,
  collectionMetadataAccount: PublicKey,
  collectionMasterEditionAccount: PublicKey,
  nftMetadata: NFTMetadata,
  tipLink: TipLink
) => {

  //Add the function to create a TipLink and update the tipLinkPubKey variable

  const tipLinkPubKey = tipLink.keypair.publicKey


  //const csvData = `${tipLink.url.href}\n`;
  //fs.appendFileSync("outputTipLink.csv", csvData, "utf8");


  const compressedNFTMetadata = createCompressedNFTMetadata(nftMetadata, payer);
  const mintIxn = mintCompressedNFTIxn(
    payer,
    treeAddress,
    collectionMint,
    collectionMetadataAccount,
    collectionMasterEditionAccount,
    compressedNFTMetadata,
    tipLinkPubKey,
  );

  try {
    // construct the transaction with our instructions, making the `payer` the `feePayer`
    const tx = new Transaction().add(
      // We'll add a small amount of lamports to the TipLink account
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: tipLinkPubKey,
        lamports: TIPLINK_MINIMUM_LAMPORTS,
      }),
      mintIxn,
    );
    tx.feePayer = payer.publicKey;

    // send the transaction to the cluster
    const txSignature = await sendAndConfirmTransaction(connection, tx, [payer], {
      commitment: "confirmed",
      skipPreflight: true,
    });

 

    return tipLink
  } catch (err) {

    // log a block explorer link for the failed transaction
    await extractSignatureFromFailedTransaction(connection, err);

    throw err;
  }
};

export default async function mintToTipLink(payer: TipLink, nftMetadatas:  NFTMetadata[], keys: {
  userAddress: PublicKey;
  treeAddress: PublicKey;
  treeAuthority: PublicKey;
  collectionMint: PublicKey;
  collectionMetadataAccount: PublicKey;
  collectionMasterEditionAccount: PublicKey;
}){
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////


  // generate a new keypair for use in this demo
  //const payer = loadOrGenerateKeypair("payer");


  // load the stored PublicKeys for ease of use
  //let keys = loadPublicKeysFromFile();

  // ensure the primary script was already run


  const treeAddress: PublicKey = keys.treeAddress;
  const treeAuthority: PublicKey = keys.treeAuthority;
  const collectionMint: PublicKey = keys.collectionMint;
  const collectionMetadataAccount: PublicKey = keys.collectionMetadataAccount;
  const collectionMasterEditionAccount: PublicKey = keys.collectionMasterEditionAccount;



  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // load the env variables and store the cluster RPC url
  const CLUSTER_URL = process.env.RPC_URL ?? clusterApiUrl("mainnet-beta");

  // create a new rpc connection, using the ReadApi wrapper
  const connection = new WrapperConnection(CLUSTER_URL);

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////


  const tipLink = await TipLink.create();



  for (const nftMetadata of nftMetadatas) {
    await createAndFundTipLink(
      connection,
      payer.keypair,
      treeAddress,
      collectionMint,
      collectionMetadataAccount,
      collectionMasterEditionAccount,
      nftMetadata,// pass the current NFTMetadata object
      tipLink
    );
  }
  
  return tipLink.url.toString()
}