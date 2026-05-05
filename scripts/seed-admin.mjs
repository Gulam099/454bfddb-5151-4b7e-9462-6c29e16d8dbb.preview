import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Please set MONGODB_URI environment variable');
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();

const dbName = process.env.MONGODB_DB;
const db = dbName ? client.db(dbName) : client.db();

const email = process.env.ADMIN_EMAIL || 'admin@example.com';
const password = process.env.ADMIN_PASSWORD || 'admin123';

const passwordHash = await bcrypt.hash(password, 10);

const admins = db.collection('admins');
await admins.updateOne(
  { email },
  { $set: { email, passwordHash } },
  { upsert: true }
);

console.log('Seeded admin:', email);
await client.close();
