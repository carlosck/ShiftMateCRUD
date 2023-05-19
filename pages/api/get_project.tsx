import { NextApiRequest, NextApiResponse } from "next";
import getFirebaseAdmin from "../../hooks/firebaseconnect";


const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  


const admin = getFirebaseAdmin()
/* {
    "mail":"correo2@postmano.com",
   "project":"nombre0 post"
} */

export default async function handler(request:NextApiRequest, response: NextApiResponse){
    if(request.method==="POST"){
        const ProjectData = await admin.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.project).get()

        console.log('Project data',ProjectData);
        return response.end(JSON.stringify(ProjectData.data()))
    }
    
    return response.end('POST expected')
}

module.exports = allowCors(handler)