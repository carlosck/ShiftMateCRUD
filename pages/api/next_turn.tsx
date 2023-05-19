import { NextApiRequest, NextApiResponse } from "next";
import getFirebaseAdmin from '../../hooks/firebaseconnect'

const db = getFirebaseAdmin()

export default async function handler(request: NextApiRequest, response: NextApiResponse){

    const project = await db.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.project).get()
    const projectData= project.data()
    const { current,actors }  = projectData
    
    const newShift=  current+1<actors.length ? current+1 : 0
    
    db.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.project).update({current: newShift})
        
    return response.end('next shift is '+actors[newShift]);

}
