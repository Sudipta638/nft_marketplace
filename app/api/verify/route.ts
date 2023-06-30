import { v4 as uuidv4 } from "uuid";
import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
;
import { withIronSession } from "next-iron-session";
import contract from "../../../public/contracts/NftMarket.json";
import { cookies } from "next/dist/client/components/headers";
import { NftMeta } from "../../../types/nft";
import axios from "axios";
import { addressCheckMiddleware ,pinataApiKey,pinataSecretApiKey} from "../utils";
const NETWORKS = {
  "5777": "Ganache"
}

type NETWORK = typeof contract.networks;

const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof NETWORK;

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
// export default withSession(async (req: NextApiRequest & {session: Session}, res: NextApiResponse) => {
//   if (req.method === "GET") {
//     try {
//       const message = { contractAddress, id: uuidv4() };
//       req.session.set("message-session", message);
//       await req.session.save();

//       res.json(message);
//     } catch {
//       res.status(422).send({message: "Cannot generate a message!"});
//     }   
//   } else {
//     res.status(200).json({message: "Invalid api route"});
//   }
// })
export const  GET = async (req: NextApiRequest & {session: Session}, res: NextApiResponse) => {
    if (req.method === "GET") {
      try {
        const message = { contractAddress, id: uuidv4() };
       console.log(message)
     
        //  req.session.set("message-session",message)
        //  await req.session.save()
        const cookieStore = cookies()
       
       console.log(cookieStore)
        return new Response(JSON.stringify(message), {
          status: 200,
          headers: { 'Set-Cookie': `nft_market=${JSON.stringify(message)}` },
        })
      } catch(err) {
        return new Response(`${err}`)
      }   
    } else {
      res.json({message: "Invalid api route"});
    }
  }
   
  export const POST =async(req:any ,res:any)=>{
    if (req.method === "POST") {
      const body = await req.json();
      console.log(body)
      try {
      
        const nft = body.nft as NftMeta
         
        if (!nft.name || !nft.description || !nft.attributes) {
          // res.status(422).send({message: "Some of the form data are missing!"});
          return new Response("Some of the form data are missing!",{status:422})
        }
        await addressCheckMiddleware(body, res);
    
        const jsonRes = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
          pinataMetadata: {
            name: uuidv4()
          },
          pinataContent: nft
        }, {
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey
          }
        });
       console.log(jsonRes.data)
      
        // res.status(200).send({message: "Nft has been created"});
        return new Response("sdfdsf",{status:200})
      } catch(error) {
        console.log(error)
        return new Response("Can not find JSOn",{status:540})
      } 
    } 
  }
