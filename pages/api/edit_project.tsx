import { NextApiRequest, NextApiResponse } from "next";
import getFirebaseAdmin from "../../hooks/firebaseconnect";
import ReturnInfo from '../../helpers/returnInfo'
//receive project: name: string, actors:[string] 
/* {
    "mail":"correo2@postmano.com",
   "name":"nombre0 post",
   "actors":[
       "benjamin","carlitos","carlos"
   ]
   
} */

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
){
    const returnInfo = new ReturnInfo()

    if(request.method === 'POST'){
        const db= await getFirebaseAdmin();
        
        try{
            await db.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.slug).set({
                    
                name: request.body.name,
                actors: request.body.actors,
                current: 0,
                last_change: new Date(),
                
            })
            
            returnInfo.setMessage('insert')
        }
        catch(error){
            returnInfo.setError("server error:"+error);
        }
    }
    return response.status(200).json(returnInfo.show())
}