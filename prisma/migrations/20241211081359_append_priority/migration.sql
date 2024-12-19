/*
  Warnings:

  - Added the required column `priority` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventPriority" AS ENUM ('low', 'medium', 'high', 'critical');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "priority" "EventPriority" NOT NULL;
