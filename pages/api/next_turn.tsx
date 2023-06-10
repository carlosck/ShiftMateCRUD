import { NextApiRequest, NextApiResponse } from "next";
import getFirebaseAdmin from "../../hooks/firebaseconnect";
import ReturnInfo from '../../helpers/returnInfo'
require('firebase-admin')

/* {
    "mail":"correo2@postmano.com",
   "project":"nombre0 post"
} */
export default async function handler(request: NextApiRequest, response: NextApiResponse){
    
    const returnInfo = new ReturnInfo()
    
    if(request.method==="POST"){
        
        try {
            const db = await getFirebaseAdmin()
            const project = await db.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.project).get()
            const projectData= project.data()
            const { current,actors }  = projectData
            
            const newShift=  current+1<actors.length ? current+1 : 0
            
            db.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.project).update({current: newShift, last_change: new Date()})
            
            returnInfo.setData({newActor: actors[newShift], newShift: newShift })

        } catch (error) {
            returnInfo.setError("server error:"+error);
        }
    }
    
            
    return response.json(returnInfo.show());
}
