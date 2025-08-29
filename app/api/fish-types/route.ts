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
