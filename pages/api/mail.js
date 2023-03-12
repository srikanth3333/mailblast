import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("mail_messages")
       
    if(req.method === "POST") {
        await collection.insertOne({
            "name" : req.body.name,
            "location" : req.body.location,
            "experience" : req.body.experience,
            "duration" : req.body.duration,
            "mandatory" : req.body.mandatory,
            "secondary" : req.body.secondary,
            "rate" : req.body.rate,
            "client" : req.body.client,
            "visa" : req.body.visa,
            "user":req.body.user,
            "fromMail":req.body.fromMail,
            "addrList":req.body.addrList,
            "timestamp" : new Date()
        })
        return response.status(200).json({msg: 'success'});
    }

}