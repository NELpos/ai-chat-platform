/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `PageSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `PageSettings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PageSettings_userId_pageName_key";

-- AlterTable
ALTER TABLE "PageSettings" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PageSettings_title_key" ON "PageSettings"("title");
