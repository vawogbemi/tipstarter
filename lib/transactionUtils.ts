import { TipLink } from '@tiplink/api'
import {
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
} from '@solana/web3.js';

const TIPLINK_SOL_ONLY_LINK_MINIMUM_LAMPORTS = 900000;

const TIPLINK_MINIMUM_LAMPORTS = 4083560;

export const getPublicKeyString = async (link_string:string) => {
    const tiplink = await TipLink.fromLink(link_string);
    return tiplink.keypair.publicKey.toBase58();
  };

  
export const fundTipLink = async (sourceKeypair:Keypair, destinationTipLink:TipLink) => {
    /* TipLink.create() should not be able to generate invalid addresses
     * this check is purely for demonstrational purposes
     */
    const isValidAddress = await PublicKey.isOnCurve(destinationTipLink.keypair.publicKey);
    if(!isValidAddress) {
      throw "Invalid TipLink";
    }
  
    let transaction = new Transaction();
    let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: sourceKeypair.publicKey,
        toPubkey: destinationTipLink.keypair.publicKey,
        lamports: TIPLINK_SOL_ONLY_LINK_MINIMUM_LAMPORTS,
      }),
    );
  
    const transactionSignature = await sendAndConfirmTransaction(connection, transaction, [sourceKeypair], {commitment: "confirmed"});
    if (transactionSignature === null) {
      throw "Unable to fund TipLink's public key";
    }
    return transactionSignature;
  };