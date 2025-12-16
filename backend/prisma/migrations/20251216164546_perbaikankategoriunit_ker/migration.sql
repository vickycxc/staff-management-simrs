/*
  Warnings:

  - You are about to drop the column `kategoriUnitkerja` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `kategoriUnitKerja` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "kategoriUnitkerja",
ADD COLUMN     "kategoriUnitKerja" "kategoriUnitKerja" NOT NULL;
