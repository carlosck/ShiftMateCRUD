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

export default async function handler(request: NextApiRequest, response: NextApiResponse) {

    if(request.method==="POST")
    {
        try{
            const userData = await db.collection('shifts').doc(request.body.mail).get()
            const userProjects = await db.collection('shifts').doc(request.body.mail).collection('projects').get()
            
            console.log('userData',userData.data());
            console.log('userProjects',userProjects.docs.map(doc=>doc.data()));
            return response.end('data')
        }
        catch(error){
            return response.end('error',error)
        }
    }
    return response.end('end')
}