/*
  Warnings:

  - You are about to drop the column `title` on the `PageSettings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,pageName]` on the table `PageSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PageSettings_title_key";

-- AlterTable
ALTER TABLE "PageSettings" DROP COLUMN "title";

-- CreateIndex
CREATE UNIQUE INDEX "PageSettings_userId_pageName_key" ON "PageSettings"("userId", "pageName");
