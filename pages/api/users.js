import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("users")
       
    if(req.method === "POST") {
      let user = await collection.findOne({email: req.query.email})
      if(!user) {
        await collection.insertOne({role:req.query.role,email:req.query.email,password:req.query.password,allowUser:req.query.allowUser})
          return response.status(200).json({msg: 'success'});
      }else {
        return response.status(200).json({msg: 'User already registered'});
      }
      
    }

}