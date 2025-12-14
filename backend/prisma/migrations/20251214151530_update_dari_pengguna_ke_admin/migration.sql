/*
  Warnings:

  - The values [FARMASI,INSTALASI_FARMASI,MANEJEMEN_DAN_ADMINISTRASI,KEUANGAN_DAN_AKUTANSI,DIKLAT_DAN_PENGEMBANGAN_SDM] on the enum `kategoriUnitkerja` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Pengguna` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "kategoriUnitkerja_new" AS ENUM ('INSTALASI_GAWAT_DARURAT_IGD', 'RAWAT_INAP', 'POLI_UMUM', 'POLI_GIGI_DAN_MULUT', 'POLI_MATA', 'POLI_PENYAKIT_DALAM', 'POLI_OBYN', 'POLI_ANAK', 'POLI_KULIT_DAN_KELAMIN', 'POLI_THT', 'POLI_KEJIWAAN', 'POLI_REHABILITASI_MEDIK', 'POLI_SYARAF', 'POLI_ORTHOPEDI', 'POLI_BEDAH_UMUM', 'INTENSIVE_CARE_UNIT_ICU_ICCU_HCU_NICU', 'GIZI', 'LABORATORIUM_PATOLOGI_KLINIK', 'LABORATORIUM_PATOLOGI_ANATOMI', 'BANK_DARAH', 'RADIOLOGI', 'INSTALASI_FARMASI_RAWAT_JALAN', 'INSTALASI_FARMASI_RAWAT_INAP', 'FISIOTERAPI', 'REKAM_MEDIS', 'MANAJEMEN_DAN_ADMIN', 'KEUANGAN', 'IT_DAN_SIMRS', 'KAMAR_OPERASI_IBS', 'KAMAR_BERSALIN', 'FRONT_OFFICE', 'BACK_OFFICE', 'HRD_DAN_DIKLAT', 'IPSRS', 'KEAMANAN_DAN_KETERTIBAN', 'FRONT_OFFICE_DAN_PENDAFTARAN', 'SANITASI_DAN_LAUNDRY');
ALTER TABLE "Staff" ALTER COLUMN "kategoriUnitkerja" TYPE "kategoriUnitkerja_new" USING ("kategoriUnitkerja"::text::"kategoriUnitkerja_new");
ALTER TYPE "kategoriUnitkerja" RENAME TO "kategoriUnitkerja_old";
ALTER TYPE "kategoriUnitkerja_new" RENAME TO "kategoriUnitkerja";
DROP TYPE "public"."kategoriUnitkerja_old";
COMMIT;

-- DropTable
DROP TABLE "Pengguna";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
