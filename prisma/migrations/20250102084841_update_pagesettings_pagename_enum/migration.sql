/*
  Warnings:

  - Changed the type of `pageName` on the `PageSettings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PageName" AS ENUM ('alerts');

-- AlterTable
ALTER TABLE "PageSettings" ALTER COLUMN "userId" DROP NOT NULL,
DROP COLUMN "pageName",
ADD COLUMN     "pageName" "PageName" NOT NULL;
