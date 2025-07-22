import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.spot.deleteMany();
  
  const trout = await prisma.fishType.upsert({
    where: { name: 'Trout' },
    update: {},
    create: { name: 'Trout' },
  });

  const bass = await prisma.fishType.upsert({
    where: { name: 'Bass' },
    update: {},
    create: { name: 'Bass' },
  });

  const salmon = await prisma.fishType.upsert({
    where: { name: 'Salmon' },
    update: {},
    create: { name: 'Salmon' },
  });

  await prisma.spot.createMany({
    data: [
      { name: 'Lake Tahoe', latitude: 39.0968, longitude: -120.0324, description: 'Beautiful lake in California.' },
      { name: 'Florida Keys', latitude: 24.5551, longitude: -81.7800, description: 'Tropical fishing paradise.' },
      { name: 'Lake Erie', latitude: 42.2097, longitude: -82.9378, description: 'Popular for bass and walleye.' },
      { name: 'Lake Superior', latitude: 47.7000, longitude: -87.5000, description: 'Largest of the Great Lakes, known for cold-water fish.' },
      { name: 'Lake Michigan', latitude: 44.0000, longitude: -87.0000, description: 'Popular freshwater lake with diverse fish species.' },
    ],
  });

  const lakeTahoe = await prisma.spot.findUnique({ where: { name: 'Lake Tahoe' } });
  const floridaKeys = await prisma.spot.findUnique({ where: { name: 'Florida Keys' } });
  const lakeErie = await prisma.spot.findUnique({ where: { name: 'Lake Erie' } });
  const lakeSuperior = await prisma.spot.findUnique({ where: { name: 'Lake Superior' } });
  const lakeMichigan = await prisma.spot.findUnique({ where: { name: 'Lake Michigan' } });

  if (lakeTahoe) {
    await prisma.spot.update({
      where: { id: lakeTahoe.id },
      data: {
        fishType: {
          connect: [{ id: trout.id }, { id: bass.id }],
        },
      },
    });
  }

  if (floridaKeys) {
    await prisma.spot.update({
      where: { id: floridaKeys.id },
      data: {
        fishType: {
          connect: [{ id: bass.id }],
        },
      },
    });
  }

  if (lakeErie) {
    await prisma.spot.update({
      where: { id: lakeErie.id },
      data: {
        fishType: {
          connect: [{ id: bass.id }, { id: trout.id }],
        },
      },
    });
  }

  if (lakeSuperior) {
    await prisma.spot.update({
      where: { id: lakeSuperior.id },
      data: {
        fishType: {
          connect: [{ id: trout.id }, { id: salmon.id }],
        },
      },
    });
  }

  if (lakeMichigan) {
    await prisma.spot.update({
      where: { id: lakeMichigan.id },
      data: {
        fishType: {
          connect: [{ id: trout.id }, { id: bass.id }],
        },
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
