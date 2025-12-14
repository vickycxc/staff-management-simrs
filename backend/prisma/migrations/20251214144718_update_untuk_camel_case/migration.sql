/*
  Warnings:

  - The values [LABORATORIUM] on the enum `kategoriUnitkerja` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `staffMedis` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `peran` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `jenisKelamin` on the `Staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "jenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "peran" AS ENUM ('NON_MEDIS', 'MEDIS', 'PENUNJANG_MEDIS', 'PERAWAT_DAN_BIDAN');

-- AlterEnum
BEGIN;
CREATE TYPE "kategoriUnitkerja_new" AS ENUM ('INSTALASI_GAWAT_DARURAT_IGD', 'RAWAT_INAP', 'POLI_UMUM', 'POLI_GIGI_DAN_MULUT', 'POLI_MATA', 'POLI_PENYAKIT_DALAM', 'POLI_OBYN', 'POLI_ANAK', 'POLI_KULIT_DAN_KELAMIN', 'POLI_THT', 'POLI_KEJIWAAN', 'POLI_REHABILITASI_MEDIK', 'POLI_SYARAF', 'POLI_ORTHOPEDI', 'POLI_BEDAH_UMUM', 'INTENSIVE_CARE_UNIT_ICU_ICCU_HCU_NICU', 'GIZI', 'LABORATORIUM_PATOLOGI_KLINIK', 'LABORATORIUM_PATOLOGI_ANATOMI', 'BANK_DARAH', 'RADIOLOGI', 'FARMASI', 'FISIOTERAPI', 'REKAM_MEDIS', 'MANAJEMEN_DAN_ADMIN', 'KEUANGAN', 'IT_DAN_SIMRS', 'KAMAR_OPERASI_IBS', 'KAMAR_BERSALIN', 'INSTALASI_FARMASI', 'MANEJEMEN_DAN_ADMINISTRASI', 'KEUANGAN_DAN_AKUTANSI', 'DIKLAT_DAN_PENGEMBANGAN_SDM', 'IPSRS', 'KEAMANAN_DAN_KETERTIBAN', 'FRONT_OFFICE_DAN_PENDAFTARAN', 'SANITASI_DAN_LAUNDRY');
ALTER TABLE "Staff" ALTER COLUMN "kategoriUnitkerja" TYPE "kategoriUnitkerja_new" USING ("kategoriUnitkerja"::text::"kategoriUnitkerja_new");
ALTER TYPE "kategoriUnitkerja" RENAME TO "kategoriUnitkerja_old";
ALTER TYPE "kategoriUnitkerja_new" RENAME TO "kategoriUnitkerja";
DROP TYPE "public"."kategoriUnitkerja_old";
COMMIT;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "peran" "peran" NOT NULL,
ADD COLUMN     "sip" TEXT,
ADD COLUMN     "sipUrl" TEXT,
DROP COLUMN "jenisKelamin",
ADD COLUMN     "jenisKelamin" "jenisKelamin" NOT NULL;

-- DropTable
DROP TABLE "staffMedis";

-- DropEnum
DROP TYPE "JenisKelamin";
