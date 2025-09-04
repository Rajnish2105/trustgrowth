/*
  Warnings:

  - Made the column `imageUrl` on table `calls` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "calls" ADD COLUMN     "allUpdates" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "imageUrl" SET NOT NULL;
