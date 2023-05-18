import { NextApiRequest, NextApiResponse } from 'next';
import { notFound } from 'next/navigation';
import * as admin from 'firebase-admin';
// import { collection, addDoc } from "firebase/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

const db = admin.firestore();
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  
  
  const users = await  db.collection('shifts')
  const userList = await users.get()    
        
  return response.end(JSON.stringify(userList.docs));
  // return response.end('end');
}