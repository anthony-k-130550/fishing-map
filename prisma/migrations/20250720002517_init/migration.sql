-- CreateTable
CREATE TABLE "Spot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);
