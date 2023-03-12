import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("users")
    if(req.method === "GET") {
        let query = {}
        let page = req.query.page || 0;
    
        if(req.query.email) {
          query = {...query, "email": {$regex: req.query.email, $options:'i'}};
        }
  
        let totalCount = await collection.find(query).count();
        let data = await collection.aggregate(
          [
              {$match:query},
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