import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export async function GET(req: Request) {
        const url = new URL(req.url);
        const minLat = parseFloat(url.searchParams.get('minLat') || '-90');
        const maxLat = parseFloat(url.searchParams.get('maxLat') || '90');

        const minLong = parseFloat(url.searchParams.get('minLong') || '-180');
        const maxLong = parseFloat(url.searchParams.get('maxLong') || '180');

        const fishParams = url.searchParams.get('filteredFishIDs'); //comes back in JSON String form
        const fishTypeIDs = fishParams ? JSON.parse(fishParams): []; //parse it back into a javascript object

        //filtering through prisma so it's neater
        const spots = await prisma.spot.findMany(
                {
                        where: {
                                latitude: {gte: minLat, lte: maxLat},
                                longitude: {gte: minLong, lte: maxLong},
                                ...((fishTypeIDs.length) > 0 && {
                                        fishType: {
                                                some: {
                                                        id: { in: fishTypeIDs },
                                                },
                                        }
                                }
                                )
                        },
                        include: {
                                fishType: true,
                        }
                }
        );

        return NextResponse.json(spots);
}
