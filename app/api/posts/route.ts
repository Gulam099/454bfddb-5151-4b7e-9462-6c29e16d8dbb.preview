import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await getDatabase()
    const posts = await db
      .collection('posts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(posts)
  } catch (error) {
    console.error('GET /api/posts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const newPost = {
      title: body.title,
      content: body.content,
      category: body.category,
      author: body.author || 'Admin',
      image: body.image,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection('posts').insertOne(newPost)

    return NextResponse.json(
      { ...newPost, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/posts error:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
