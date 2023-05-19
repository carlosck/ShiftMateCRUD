
import { NextApiRequest, NextApiResponse } from "next"
import * as admin from  'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })
    });
  }
const db= admin.firestore();

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
){
    //console.log('NextApiRequest',request)
    if(request.method === 'POST')
    {
      
      try {
        const docRef= db.collection('shifts').doc(request.body.mail).set({
            user: request.body.user,
            mail: request.body.mail,
            name: request.body.name,
            projects: []
        })
    } catch (error) {
        
    }
      
      
    }
    
    
    return response.end('<p>Insert done</p>');
}