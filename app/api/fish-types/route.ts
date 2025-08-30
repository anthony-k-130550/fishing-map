import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const fishTypes = await prisma.fishType.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(fishTypes);
  } catch (error) {
    console.error('Error fetching fish types:', error);
    return NextResponse.json({ error: 'Failed to fetch fish types' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
          const { name } = await req.json();

          if (!name || !name.trim()) {
                  return NextResponse.json({ error: 'Name is required' }, {status: 400});
          }

          const newFishTypeEntry = await prisma.fishType.create({
                  data: { name: name.trim() },
          });

          return NextResponse.json(newFishTypeEntry, {status: 201});
  } catch (error) {
          console.error('Error creating fish type: ', error);
          return NextResponse.json({ error: 'Internal server error' }, {status: 500})
  }
}