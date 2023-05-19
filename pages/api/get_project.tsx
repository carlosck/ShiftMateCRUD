import { NextApiRequest, NextApiResponse } from "next";
import * as admin from 'firebase-admin' 

if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
    });
}
const db= admin.firestore()

/* {
    "mail":"correo2@postmano.com",
   "project":"nombre0 post"
} */

export default async function handler(request:NextApiRequest, response: NextApiResponse){
    if(request.method==="POST"){
        const ProjectData = await db.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.project).get()

        console.log('Project data',ProjectData);
        return response.end(JSON.stringify(ProjectData.data()))
    }
    
    return response.end('POST expected')
}
