/*
  Warnings:

  - You are about to drop the column `nip` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `email` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "nip",
ADD COLUMN     "email" TEXT NOT NULL;
