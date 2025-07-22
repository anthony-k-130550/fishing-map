-- AlterTable
ALTER TABLE "Spot" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "FishType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FishType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpotFishTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SpotFishTypes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "FishType_name_key" ON "FishType"("name");

-- CreateIndex
CREATE INDEX "_SpotFishTypes_B_index" ON "_SpotFishTypes"("B");

-- AddForeignKey
ALTER TABLE "_SpotFishTypes" ADD CONSTRAINT "_SpotFishTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "FishType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpotFishTypes" ADD CONSTRAINT "_SpotFishTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
