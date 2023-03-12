import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("mail_messages")
    if(req.method === "GET") {
        let query = {}
        let page = req.query.page || 0;
    
        if(req.query.email) {
          query = {...query, "email": {$regex: req.query.email, $options:'i'}};
        }

        if(req.query.campaignId) {
            query = {...query, "campaignId": req.query.campaignId};
        }
  
        let totalCount = await collection.find({...query, user: req.query.user}).count();
        let data = await collection.aggregate(
          [
              {$match:{...query, user: req.query.user}},
              {$sort:{"timestamp":-1}},
              {$skip:page*20},
              {$limit:20},
              {
                $project: {
                      _id: 0,
                  },
              },
          ]).toArray();
        return response.status(200).json({totalCount: totalCount,data:data});
      }

}