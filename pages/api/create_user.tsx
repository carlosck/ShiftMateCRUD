
import { NextApiRequest, NextApiResponse } from "next"
import getFirebaseAdmin from "../../hooks/firebaseconnect";
import ReturnInfo from '../../helpers/returnInfo'
/* {
  "name":"nombre2 post",
  "mail":"correo2@postmano.com",
  "user":"2desde postman"
} */
export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
){
    const returnInfo = new ReturnInfo()

    if(request.method === 'POST')
    {
      const db= await getFirebaseAdmin();
      try {
        const docRef= db.collection('shifts').doc(request.body.mail).set({
            user: request.body.user,
            mail: request.body.mail,
            name: request.body.name,
            projects: []
        })
        returnInfo.setMessage('insert')
    } catch (error) {
      returnInfo.setError("server error:"+error);
    }      
      
  }
    
  return response.status(200).json(returnInfo.show())
}