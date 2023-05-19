import { NextApiRequest, NextApiResponse } from "next";
import getFirebaseAdmin from "../../hooks/firebaseconnect";

const admin = getFirebaseAdmin()
/* {
    "mail":"correo2@postmano.com",
   "project":"nombre0 post"
} */
export default async function handler(request:NextApiRequest, response: NextApiResponse){
    
    const ProjectData = await admin.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.project).get()

    console.log('Project data',ProjectData);
    return response.end(JSON.stringify(ProjectData.data()))
}