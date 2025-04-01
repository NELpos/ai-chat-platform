/*
  Warnings:

  - You are about to drop the column `title` on the `PageSettings` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PageSettings_title_key";

-- AlterTable
ALTER TABLE "PageSettings" DROP COLUMN "title",
ALTER COLUMN "userId" DROP NOT NULL;
