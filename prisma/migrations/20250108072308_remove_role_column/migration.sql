/*
  Warnings:

  - You are about to drop the column `role` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";
