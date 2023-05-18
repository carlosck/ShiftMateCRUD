/* import 'server-only';
import  * as admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })
    });
  }
  
const db = admin.firestore()
 */
export default async function Page(_req, _res) {

    /* const users = await  db.collection('shifts')
    const userList = await users.get()    
    
    return <div>
        <h1>
            Users        
        </h1>
        
            {
            userList.docs.map((user)=>(
                <div key={user.id}>
                    <p>User: {user.get('user')}</p>
                    <p>Email:{user.get('mail')}</p>
                    <p>Projects: </p>
                    <ul>
                        {
                            user.get('projects').map(project=>{
                                <li></li>
                            })
                        }
                        
                    </ul>
                </div>
            ))
            }
    </div>; */
    return <div>test</div>
        
}