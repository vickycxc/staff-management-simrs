/*
  Warnings:

  - You are about to drop the column `idStaff` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `staffId` to the `Diklat` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Staff_idStaff_key";

-- AlterTable
ALTER TABLE "Diklat" ADD COLUMN     "staffId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "idStaff";

-- AddForeignKey
ALTER TABLE "KinerjaStaff" ADD CONSTRAINT "KinerjaStaff_id_fkey" FOREIGN KEY ("id") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diklat" ADD CONSTRAINT "Diklat_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "KinerjaStaff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
