import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("users")
    if(req.method === "POST") {
      let user = await collection.findOne({email: req.query.email, password: req.query.password})
      console.log(user)
      if(!user) {
          return response.status(200).json({msg: 'Not a registered user'});
      }else {
        return response.status(200).json({msg: 'Success', status: 200});
      }
      
    }

}