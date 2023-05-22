import { NextApiRequest, NextApiResponse } from "next";
import getFirebaseAdmin from "../../hooks/firebaseconnect";
import ReturnInfo from '../../helpers/returnInfo'
/* {
    "mail":"correo2@postmano.com"
} */
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const returnInfo = new ReturnInfo()

    if(request.method==="POST")
    {
        try{
            const db= await getFirebaseAdmin();
            const userData = await db.collection('shifts').doc(request.body.mail).get()
            const userProjects = await db.collection('shifts').doc(request.body.mail).collection('projects').get()
                        
            returnInfo.setData(userProjects.docs.map(doc=>doc.data()))
        }
        catch(error){
            return response.end('error',error)
        }
    }
    return response.status(200).json(returnInfo.show())
    
    // return response.end()
}