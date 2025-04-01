/*
  Warnings:

  - A unique constraint covering the columns `[userId,pageName]` on the table `PageSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PageSettings_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "PageSettings_userId_pageName_key" ON "PageSettings"("userId", "pageName");
