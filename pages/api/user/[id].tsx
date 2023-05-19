import { useRouter } from "next/router";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(request: NextApiRequest,response: NextApiResponse){
    const router = useRouter();
    return response.end(<p>ID: {router.query.slug}</p>);
    
    
}