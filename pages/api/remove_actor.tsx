import { NextApiRequest, NextApiResponse } from "next";
import getFirebaseAdmin from "../../hooks/firebaseconnect";
import ReturnInfo from '../../helpers/returnInfo'
/* {
    "mail":"correo2@postmano.com",
   "project":"nombre0 post"
   "actor": "juanis"
} */
export default async function handler(request: NextApiRequest, response: NextApiResponse){
    const db= await getFirebaseAdmin();
    
    const returnInfo = new ReturnInfo()
    
    const NewActor = request.body.actor;
    const projectPath = db.collection('shifts').doc(request.body.mail).collection('projects').doc(request.body.project)
    const project = await projectPath.get()
    const dataProject = project.data()
        
    if(!dataProject.actors.includes(NewActor)){
        returnInfo.setError("Name didn't exist");    
    }
    else
    {
        try{            
            await projectPath.update({ actors: dataProject.actors.filter(_actor=> _actor!== NewActor)})
            returnInfo.setMessage("Actor Removed");
        }
        catch(error){ 
            returnInfo.setError("server error:"+error);
        }
    }

    return response.json(returnInfo.show());

}