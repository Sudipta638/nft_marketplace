// import { ethers ,Transaction} from "ethers";

// export async function recover(tx: ethers.Transaction): Promise<{
//   publicKey: string;
//   address: string;
// }> {
//   const expandedSig = {
//     r: tx.r!,
//     s: tx.s!,
//     v: tx.v!,
//   };

//   const signature =ethers.Signature.from(expandedSig).serialized

//   const txData = {
//     gasLimit: tx.gasLimit,
//     value: tx.value,
//     nonce: tx.nonce,
//     data: tx.data,
//     chainId: tx.chainId,
//     to: tx.to, // you might need to include this if it's a regular tx and not simply a contract deployment
//     type: tx.type,
//     maxFeePerGas: tx.maxFeePerGas,
//     maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
//   };

//   const rsTx = await ethers.resolveProperties(txData);
//   const raw = Transaction.from(rsTx).serialized; // returns RLP encoded tx
//   const msgHash = ethers.keccak256(raw); // as specified by ECDSA
//   const msgBytes = ethers.arrayify(msgHash); // create binary hash

//   return {
//     publicKey: ethers.recoverPublicKey(msgBytes, signature),
//     address: ethers.utils.recoverAddress(msgBytes, signature),
//   };
// }