/*
  Warnings:

  - You are about to drop the column `jabatanSpesfik` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `jabatanSpesifik` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "jabatanSpesfik",
ADD COLUMN     "jabatanSpesifik" TEXT NOT NULL;
