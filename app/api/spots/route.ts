import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const spots = await prisma.spot.findMany({
            include: {
                fishType: true  // Include the fish type relationship data
            }
        });
        return NextResponse.json(spots);
    } catch (error) {
        console.error('Error fetching spots:', error);
        return NextResponse.json({ error: 'Failed to fetch spots' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, latitude, longitude, description, fishTypeIds } = await request.json();
        
        if (!name || !latitude || !longitude) {
            return NextResponse.json({ error: 'Name, latitude, and longitude are required' }, { status: 400 });
        }
        
        const spot = await prisma.spot.create({
            data: {
                name: name.trim(),
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                description: description?.trim() || null,
                fishType: {
                    connect: fishTypeIds?.map((id: number) => ({ id })) || []
                }
            },
            include: {
                fishType: true
            }
        });
        
        return NextResponse.json(spot, { status: 201 });
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return NextResponse.json({ error: 'A spot with this name already exists' }, { status: 409 });
        }
        
        console.error('Error creating spot:', error);
        return NextResponse.json({ error: 'Failed to create spot' }, { status: 500 });
    }
}

