import 'server-only';
import { notFound } from 'next/navigation';
import * as admin from 'firebase-admin';
import { collection, addDoc } from "firebase/firestore";

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

export default async function Page(req, res) {
  const projects = await db.collection('shifts').doc('projects').get();
  console.log("req",req);
  console.log("res",res);
  console.log("projects",projects);

  try {
    const docRef = await db.collection('shifts').add({
      user: 500,
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
    
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
  return <div>Hello,prueba!</div>;
}
/*
export default async function Page() {
  const user = await db.collection('users').doc('leerob').get();

  if (!user.exists) {
    notFound();
  }

  return <div>Hello, {user.data().name}!</div>;
}
*/
