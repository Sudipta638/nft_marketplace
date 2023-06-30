
import contract from "../../public/contracts/NftMarket.json";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSession, Session } from "next-iron-session";
const NETWORKS = {
  "5777": "Ganache"
}
import { cookies } from 'next/headers'
import { ethers } from "ethers";
import { NftMarketContract } from "../../types/nftMarketContract";
import * as util from "ethereumjs-util"
export const pinataApiKey = process.env.PINATA_API_KEY as string;
export const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY as string;
type NETWORK = typeof contract.networks;
const abi = contract.abi;
const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof NETWORK;
export const addressCheckMiddleware = async (req: any & { session: Session}, res: NextApiResponse) => {
    return new Promise(async(resolve, reject) => {
        const cookieStore = cookies()
        const message = cookieStore.get('nft_market')
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          provider
        ) as unknown as NftMarketContract;
        console.log(provider)
    
       console.log(message?.value)
        let nonce: string | Buffer = 
        "\x19Ethereum Signed Message:\n" +
        JSON.stringify(message?.value).length + 
        JSON.stringify(message?.value);
          nonce = util.keccak(Buffer.from(nonce, "utf-8"));
        console.log(nonce)
        // console.log(req)
      const { v, r, s } = util.fromRpcSig(req.signature);
      const pubKey = util.ecrecover(util.toBuffer(nonce), v,r,s);
      const addrBuffer = util.pubToAddress(pubKey);
      const address = util.bufferToHex(addrBuffer);
      console.log(address);
    //   console.log(address);
      const name = await contract.name();
        console.log(name);
      if (address) {
        resolve("Correct Address");
      } else {
        reject("Wrong Address");
      }
    })}
export const contractAddress = contract["networks"][targetNetwork]["address"];

export function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: "nft-auth-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    }
  })
}