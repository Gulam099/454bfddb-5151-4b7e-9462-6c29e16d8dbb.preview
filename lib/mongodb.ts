import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    family: 4, // Force IPv4 to avoid DNS timeout issues on some networks
    serverSelectionTimeoutMS: 10000,
  });
  await client.connect();
  const db = client.db();

  cachedClient = client;
  cachedDb = db;
  console.debug('Connected to MongoDB, db name=', db.databaseName);
  return { client, db };
}

export async function getDatabase() {
  const { db } = await connectToDatabase();
  return db;
}
