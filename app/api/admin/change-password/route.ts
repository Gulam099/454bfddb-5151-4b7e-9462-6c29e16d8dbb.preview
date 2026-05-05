import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { email, oldPassword, newPassword } = await req.json();
    if (!email || !oldPassword || !newPassword) return NextResponse.json({ ok: false, message: 'Missing' }, { status: 400 });

    const { db } = await connectToDatabase();
    const admins = db.collection('admin');
    const admin = await admins.findOne({ email });
    const storedHash = admin?.passwordHash;
    if (!admin || !storedHash) return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });

    const match = await bcrypt.compare(oldPassword, storedHash);
    if (!match) return NextResponse.json({ ok: false, message: 'Current password incorrect' }, { status: 401 });

    const newHash = await bcrypt.hash(newPassword, 10);
    await admins.updateOne({ email }, { $set: { passwordHash: newHash } }, { upsert: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Change password error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
