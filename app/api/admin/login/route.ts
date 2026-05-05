import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Missing credentials' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    // try the common collection name 'admins' (some existing data may use this)
    const admin = await db.collection('admin').findOne({ email });
    console.log('[admin-login] admin record=', admin);
    const storedHash = admin?.passwordHash

    // Debug info
    console.debug('[admin-login] email=', email);
    console.debug('[admin-login] admin found=', !!admin);
    if (admin) {
      console.debug('[admin-login] hashField=', admin.passwordHash ? 'passwordHash' : admin.password ? 'password' : 'none');
      const sample = String(storedHash).slice(0, 6);
      console.debug('[admin-login] storedHash sample=', sample, 'len=', String(storedHash).length);
    }

    if (!admin || !storedHash) {
      console.debug('[admin-login] no stored hash, returning 401');
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const match = await bcrypt.compare(password, storedHash);
    console.debug('[admin-login] bcrypt.compare result=', match);
    if (!match) return NextResponse.json({ ok: false }, { status: 401 });

    const cookie = `admin-auth=true; Path=/; HttpOnly; Max-Age=${60 * 60}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;

    return NextResponse.json({ ok: true }, { status: 200, headers: { 'Set-Cookie': cookie } });
  } catch (err) {
    console.error('Login error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
