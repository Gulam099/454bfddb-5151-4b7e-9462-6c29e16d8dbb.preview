import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const queryData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
      createdAt: new Date(),
    };

    const result = await db.collection('queries').insertOne(queryData);

    return NextResponse.json(
      { message: 'Query submitted successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/queries error:', error);
    return NextResponse.json(
      { error: 'Failed to submit query' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    
    // Sort by createdAt descending (newest first)
    const queries = await db
      .collection('queries')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(queries);
  } catch (error) {
    console.error('GET /api/queries error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch queries' },
      { status: 500 }
    );
  }
}
