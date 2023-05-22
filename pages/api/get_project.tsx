import { NextApiRequest, NextApiResponse } from "next";
import getFirebaseAdmin from "../../hooks/firebaseconnect";
import ReturnInfo from '../../helpers/returnInfo'

/* {
    "mail":"correo2@postmano.com",
   "project":"nombre0 post"
} */

export default async function handler(request:NextApiRequest, response: NextApiResponse){
    const returnInfo = new ReturnInfo()

    if(request.method==="POST"){
        const db= await getFirebaseAdmin();
        try {
            const ProjectData = await db.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.project).get()            
            returnInfo.setData(ProjectData.data())
        } catch (error) {
            returnInfo.setError("server error:"+error);
        }        
    }
    
    return response.status(200).json(returnInfo.show())
}
