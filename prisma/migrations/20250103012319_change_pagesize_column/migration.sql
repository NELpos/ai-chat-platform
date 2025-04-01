/*
  Warnings:

  - You are about to drop the column `pageName` on the `PageSettings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `PageSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alertPageSize` to the `PageSettings` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `PageSettings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "PageSettings_userId_pageName_key";

-- AlterTable
ALTER TABLE "PageSettings" DROP COLUMN "pageName",
ADD COLUMN     "alertPageSize" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PageSettings_userId_key" ON "PageSettings"("userId");
