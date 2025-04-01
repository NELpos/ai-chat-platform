/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `PageSettings` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `PageSettings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PageSettings" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PageSettings_userId_key" ON "PageSettings"("userId");
