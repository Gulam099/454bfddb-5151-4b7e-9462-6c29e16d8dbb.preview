import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ ok: false, message: 'Missing' }, { status: 400 });

    const { db } = await connectToDatabase();
    const admins = db.collection('admin');
    const existingCount = await admins.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({ ok: false, message: 'Admin already exists' }, { status: 403 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await admins.insertOne({ email, passwordHash, createdAt: new Date().toISOString() });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('Signup error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
