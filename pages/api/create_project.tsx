import { NextApiRequest, NextApiResponse } from "next";
import getFirebaseAdmin from "../../hooks/firebaseconnect";
import ReturnInfo from '../../helpers/returnInfo'
//receive project: name: string, actors:[string] 
/* {
    "mail":"correo2@postmano.com",
   "name":"nombre0 post",
   "actors":[
       "benjamin","carlitos","carlos"
   ]
   
} */
function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
){
    const returnInfo = new ReturnInfo()

    if(request.method === 'POST'){
        const db= await getFirebaseAdmin();
        
        try{
            await db.collection('shifts').doc(request.body.mail).collection('projects').doc(slugify(request.body.name)).set({
                    
                name: request.body.name,
                actors: request.body.actors,
                current: 0,
                last_change: new Date(),
                
            })
            
            returnInfo.setMessage('insert')
        }
        catch(error){
            returnInfo.setError("server error:"+error);
        }
    }
    return response.status(200).json(returnInfo.show())
}