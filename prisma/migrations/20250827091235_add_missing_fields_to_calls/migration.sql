/*
  Warnings:

  - You are about to drop the column `status` on the `calls` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `calls` table. All the data in the column will be lost.
  - The `action` column on the `calls` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `minTarget` to the `calls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stoploss` to the `calls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `calls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `calls` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `entry` on the `calls` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Action" AS ENUM ('BUY', 'SELL', 'WATCH', 'HOLD');

-- DropForeignKey
ALTER TABLE "calls" DROP CONSTRAINT "calls_userId_fkey";

-- AlterTable
ALTER TABLE "calls" DROP COLUMN "status",
DROP COLUMN "userId",
ADD COLUMN     "minTarget" INTEGER NOT NULL,
ADD COLUMN     "stoploss" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "action",
ADD COLUMN     "action" "Action" NOT NULL DEFAULT 'WATCH',
DROP COLUMN "entry",
ADD COLUMN     "entry" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "exit" DROP NOT NULL,
ALTER COLUMN "return" DROP NOT NULL;

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSeen" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "calls_id_idx" ON "calls"("id");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
