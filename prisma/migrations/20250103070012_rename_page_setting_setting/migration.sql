/*
  Warnings:

  - You are about to drop the `PageSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PageSettings" DROP CONSTRAINT "PageSettings_userId_fkey";

-- DropTable
DROP TABLE "PageSettings";

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "alertPageSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting_userId_key" ON "Setting"("userId");

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
