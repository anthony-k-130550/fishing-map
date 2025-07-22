import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const spots = await prisma.spot.findMany();
    return NextResponse.json(spots);
}

