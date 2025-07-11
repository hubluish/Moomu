
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const url = process.env.MONGODB_URI || 'mongodb+srv://gaeunpop:1111@cluster0.uqxyg33.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'article';

async function connectToDatabase() {
  const client = new MongoClient(url);
  await client.connect();
  return client;
}

export async function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const slug = context.params.slug;
  let client: MongoClient | null = null;

  try {
    client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection('article');

    if (slug.length === 1) {
      // /api/articles/:id
      const result = await collection.findOne({ _id: new ObjectId(slug[0]) });
      if (!result) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(result);
    } else if (slug.length === 2 && slug[0] === 'slug') {
      // /api/articles/slug/:slug
      const result = await collection.findOne({ slug: slug[1] });
      if (!result) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(result);
    } else {
        // /api/articles
        const result = await collection.find().toArray();
        return NextResponse.json(result);
    }
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
