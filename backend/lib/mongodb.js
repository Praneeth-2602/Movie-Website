import { MongoClient } from 'mongodb';


// Connection URL
const uri = 'mongodb+srv://admin:mongoDB@cluster0.kiad0oo.mongodb.net/myDatabase?retryWrites=true&w=majority';
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;