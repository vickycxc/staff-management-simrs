/*
  Warnings:

  - You are about to drop the column `capaianKP` on the `KinerjaStaff` table. All the data in the column will be lost.
  - You are about to drop the column `capaianTB` on the `KinerjaStaff` table. All the data in the column will be lost.
  - You are about to drop the column `realisasiKP` on the `KinerjaStaff` table. All the data in the column will be lost.
  - You are about to drop the column `realisasiTB` on the `KinerjaStaff` table. All the data in the column will be lost.
  - You are about to drop the column `targetKP` on the `KinerjaStaff` table. All the data in the column will be lost.
  - You are about to drop the column `targetTB` on the `KinerjaStaff` table. All the data in the column will be lost.
  - Added the required column `capaianKepuasanPasien` to the `KinerjaStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capaianTimePasienBaru` to the `KinerjaStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realisasiKepuasanPasien` to the `KinerjaStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realisasiTimePasienBaru` to the `KinerjaStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetKepuasanPasien` to the `KinerjaStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetTimePasienBaru` to the `KinerjaStaff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KinerjaStaff" DROP COLUMN "capaianKP",
DROP COLUMN "capaianTB",
DROP COLUMN "realisasiKP",
DROP COLUMN "realisasiTB",
DROP COLUMN "targetKP",
DROP COLUMN "targetTB",
ADD COLUMN     "capaianKepuasanPasien" TEXT NOT NULL,
ADD COLUMN     "capaianTimePasienBaru" TEXT NOT NULL,
ADD COLUMN     "realisasiKepuasanPasien" TEXT NOT NULL,
ADD COLUMN     "realisasiTimePasienBaru" TEXT NOT NULL,
ADD COLUMN     "targetKepuasanPasien" TEXT NOT NULL,
ADD COLUMN     "targetTimePasienBaru" TEXT NOT NULL;
