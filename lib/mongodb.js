import { MongoClient } from "mongodb";

let NEXT_ATLAS_URI = "mongodb+srv://srikanth1113:0zg2lHTGSCR2tgC3@cluster0.gzm5l.mongodb.net/?retryWrites=true&w=majority"
let NEXT_ATLAS_DATABASE = "Test";
const uri = NEXT_ATLAS_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient = null;
let database = null;

// if (NEXT_ATLAS_URI) {
//     throw new Error('Please add your Mongo URI to .env.local')
// }

export async function connectToDatabase() {
    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }
        if (true) {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(uri, options)).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = await (new MongoClient(uri, options)).connect();
        }
        database = await mongoClient.db(NEXT_ATLAS_DATABASE);
        console.log('connected....')
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
    }
}