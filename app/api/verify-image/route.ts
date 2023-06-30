import { FileReq } from "../../../types/nft";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import { addressCheckMiddleware, pinataApiKey, pinataSecretApiKey, withSession } from "../utils";
import FormData from "form-data";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export const POST=(async (
  req: any & {session: Session}, 
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const body=await req.json()
    const {
      bytes,
      fileName,
      contentType
    } = body as FileReq;
    // console.log(fileName);
    // console.log(contentType);
    // console.log(bytes);
    // console.log(body)
    if (!bytes || !fileName || !contentType) {
        return new Response("Does not have  image",{status:402})
    }

    await addressCheckMiddleware(body, res);

  
    const buffer = Buffer.from(Object.values(bytes));
    const formData = new FormData();
    formData.append(
        "file",
        buffer, {
          contentType,
          filename: fileName + "-" + uuidv4()
        }
      );
  
      const fileRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey
        }
      });
     console.log(fileRes.data)
    return new Response(JSON.stringify(fileRes.data),{status:200})


  } else {
    return new Response("ERRor to upload image",{status:405})
  }
})