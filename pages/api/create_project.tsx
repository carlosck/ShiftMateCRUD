import { NextApiRequest, NextApiResponse } from "next";
import * as admin from 'firebase-admin'

if(!admin.apps.length){
    admin.initializeApp({
        credential:admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
          })
        }
    )
}

const db = admin.firestore();
//receive project: name: string, actors:[string] 
export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
){

    if(request.method === 'POST'){

        
        try{
            const userData =await db.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.name).set({
                    
                name: request.body.name,
                actors: request.body.actors,
                current:0
                
            })
            
            return response.end('insert')
        }
        catch(error){
            console.log('error',error)
        }
    }
    return response.end('response')
}