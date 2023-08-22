/**
 * Compressed NFTs on Solana, using State Compression
  ---
  Overall flow of this script
  - load a keypair named `payer` 
  - create a new tree with enough space to mint all the nft's you want for the "collection"
  - create a new NFT Collection on chain (using the usual Metaplex methods)
  - display the overall cost to perform all these actions

  ---
*/

/**
 * General process of minting a compressed NFT:
 * - create a tree
 * - create a collection
 * - mint compressed NFTs to the tree (This is done in the mintToTipLink.ts script)
 */

import { Resend } from 'resend';

import { Keypair, clusterApiUrl } from "@solana/web3.js";
import {
  ValidDepthSizePair,
  getConcurrentMerkleTreeAccountSize,
} from "@solana/spl-account-compression";

import { CreateMetadataAccountArgsV3 } from "@metaplex-foundation/mpl-token-metadata";

// import custom helpers to mint compressed NFTs
import { createCollection, createTree, } from "@/tiplink/utils/compression";

// local import of the connection wrapper, to help with using the ReadApi
import { WrapperConnection } from "@/tiplink/ReadApi/WrapperConnection";

import dotenv from "dotenv";
import { TipLink } from "@tiplink/api";
import mintToTipLink from "./mintToTipLink";
import { NFTMetadata } from "../onChainNftMetadata/onChainNFTs";
dotenv.config();

// define some reusable balance values for tracking
let initBalance: number, balance: number;



export default async function createCollectionAndMerkleTree({ collectionData, nftData, totalPayments, creatorTipLink }: {
  collectionData: {
    collection_description: string;
    collection_image: string;
    collection_name: string;
    created_at: string;
    creator_email: string;
    id: number;
    project_id: number | null;
  } | undefined,

  nftData: {
    collection_id: number | null;
    created_at: string;
    id: number;
    nft_description: string;
    nft_image: string;
    nft_name: string;
    nft_price: number;
    project_id: number | null;
  }[] | null,

  totalPayments: { name: string, unitAmountDecimal: number }[],
  creatorTipLink: string | undefined
}) {
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  const payer = await TipLink.fromLink(creatorTipLink ? creatorTipLink : "")

  // load your kepair locally from the filesystem after running the createWallet.ts script)
  //const payer = loadOrGenerateKeypair("payer");



  // locally save the addresses for the demo
  //savePublicKeyToFile("userAddress", payer.keypair.publicKey);

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // load the env variables and store the cluster RPC url
  const CLUSTER_URL = process.env.RPC_URL ?? clusterApiUrl("mainnet-beta");

  // create a new rpc connection, using the ReadApi wrapper
  const connection = new WrapperConnection(CLUSTER_URL);

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // get the payer's starting balance
  initBalance = await connection.getBalance(payer.keypair.publicKey);
  

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /*
    Define our tree size parameters
  */
  const maxDepthSizePair: ValidDepthSizePair = {
    // max=8 nodes
    //maxDepth: 3,
    //maxBufferSize: 8,

    //max=32 nodes
    maxDepth: 5,
    maxBufferSize: 8,

    // max=16,384 nodes
    //  maxDepth: 14,
    //  maxBufferSize: 64,

    // max=131,072 nodes
    // maxDepth: 17,
    // maxBufferSize: 64,

    // max=1,048,576 nodes
    // maxDepth: 20,
    // maxBufferSize: 256,

    // max=1,073,741,824 nodes
    // maxDepth: 30,
    // maxBufferSize: 2048,
  };
  const canopyDepth = maxDepthSizePair.maxDepth - 3;

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /*
    For demonstration purposes, we can compute how much space our tree will 
    need to allocate to store all the records. As well as the cost to allocate 
    this space (aka minimum balance to be rent exempt)
    ---
    NOTE: These are performed automatically when using the `createAllocTreeIx` 
    function to ensure enough space is allocated, and rent paid.
  */

  // calculate the space available in the tree
  const requiredSpace = getConcurrentMerkleTreeAccountSize(
    maxDepthSizePair.maxDepth,
    maxDepthSizePair.maxBufferSize,
    canopyDepth,
  );

  const storageCost = await connection.getMinimumBalanceForRentExemption(requiredSpace);

  // demonstrate data points for compressed NFTs
  
  // ensure the payer has enough balance to create the allocate the Merkle tree


  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /*
    Actually allocate the tree on chain
  */

  // define the address the tree will live at
  const treeKeypair = Keypair.generate();

  // create and send the transaction to create the tree on chain
  const tree = await createTree(connection, payer.keypair, treeKeypair, maxDepthSizePair, canopyDepth);


  // locally save the addresses for the demo
  //savePublicKeyToFile("treeAddress", tree.treeAddress);
  //savePublicKeyToFile("treeAuthority", tree.treeAuthority);

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /*
    Create the actual NFT collection (using the normal Metaplex method)
    (nothing special about compression here)
  */
  // define the metadata to be used for creating the NFT collection
  "https://lprpwskeennxoukahtlc.supabase.co/storage/v1/object/public/nft_collections/${collectionData?.collection_image}"
  const collectionMetadataV3: CreateMetadataAccountArgsV3 = {
    data: {
      name: collectionData?.collection_name!,
      symbol: "Tipstarter",
      // specific json metadata for the collection
      //https://shdw-drive.genesysgo.net/91uEGv2pFyc3nZPgya6L41FKaoD6GoTcGDHqhokHe7Hw/metaURI.json
      uri: `https://api.val.town/v1/run/vawogbemi.cV3?args=["${collectionData?.collection_name}","https://res.cloudinary.com/demonicirfan/image/upload/v1692125694/cover_img_1_qdnmpb.png","${payer.keypair.publicKey.toBase58()}"]`,
      sellerFeeBasisPoints: 100,
      creators: [
        {
          address: payer.keypair.publicKey,
          verified: false,
          share: 100,
        },
      ], // or set to `null`
      collection: null,
      uses: null,
    },
    isMutable: false,
    collectionDetails: null,
  };

  // create a full token mint and initialize the collection (with the `payer` as the authority)
  const collection = await createCollection(connection, payer.keypair, collectionMetadataV3);

  // locally save the addresses for the demo
  //savePublicKeyToFile("collectionMint", collection.mint);
  //savePublicKeyToFile("collectionMetadataAccount", collection.metadataAccount);
  //savePublicKeyToFile("collectionMasterEditionAccount", collection.masterEditionAccount);

  const keys = {
    "userAddress": payer.keypair.publicKey,
    "treeAddress": tree.treeAddress,
    "treeAuthority": tree.treeAuthority,
    "collectionMint": collection.mint,
    "collectionMetadataAccount": collection.metadataAccount,
    "collectionMasterEditionAccount": collection.masterEditionAccount,
  }


  /**
   * INFO: NFT collection != tree
   * ---
   * NFTs collections can use multiple trees for their same collection.
   * When minting any compressed NFT, simply pass the collection's addresses
   * in the transaction using any valid tree the `payer` has authority over.
   *
   * These minted compressed NFTs should all still be apart of the same collection
   * on marketplaces and wallets.
   */

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // fetch the payer's final balance
  balance = await connection.getBalance(payer.keypair.publicKey);

  const resend = new Resend(process.env.RESEND_API_KEY);



  totalPayments.forEach(async payment => {

    const nftMetadatas: NFTMetadata[] = nftData ? nftData?.filter(key => payment.unitAmountDecimal >= (key.nft_price ? key.nft_price : 0)).map(
      key => ({
        name: key.nft_name ? key.nft_name : "no name provided",
        uri: `https://api.val.town/v1/run/vawogbemi.nft?args=["${key.nft_name}","${key.nft_description}","https://lprpwskeennxoukahtlc.supabase.co/storage/v1/object/public/nfts/${key.nft_image}"]`,
        symbol: "Tipstarter",
      })
    ) : [
      {
        name: "default",
        uri: "default",
        symbol: "default",
      }
    ]

    const str = await mintToTipLink(payer, nftMetadatas, keys)
    const userTipLink = await TipLink.fromLink(str!)

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: payment.name,
      subject: `Tipstarter ${collectionData?.collection_name} Supporter Wallet`,
      html: `<p>Congrats on your <strong>tiplink: ${userTipLink.url.toString()}</strong>!</p> `
    });

  })

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: collectionData?.creator_email!,
    subject: `Tipstarter ${collectionData?.collection_name} Creator Wallet`,
    html: `<p>Congrats on your <strong>tiplink: ${payer.url.toString()}</strong>!</p>`
  });


}