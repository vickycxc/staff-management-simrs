/*
  Warnings:

  - The values [IT_DAN_SIMRS,FRONT_OFFICE_DAN_PENDAFTARAN,SANITASI_DAN_LAUNDRY] on the enum `kategoriUnitkerja` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "kategoriUnitkerja_new" AS ENUM ('INSTALASI_GAWAT_DARURAT_IGD', 'RAWAT_INAP', 'POLI_UMUM', 'POLI_GIGI_DAN_MULUT', 'POLI_MATA', 'POLI_PENYAKIT_DALAM', 'POLI_OBYN', 'POLI_ANAK', 'POLI_KULIT_DAN_KELAMIN', 'POLI_THT', 'POLI_KEJIWAAN', 'POLI_REHABILITASI_MEDIK', 'POLI_SYARAF', 'POLI_ORTHOPEDI', 'POLI_BEDAH_UMUM', 'INTENSIVE_CARE_UNIT_ICU_ICCU_HCU_NICU', 'GIZI', 'LABORATORIUM_PATOLOGI_KLINIK', 'LABORATORIUM_PATOLOGI_ANATOMI', 'BANK_DARAH', 'RADIOLOGI', 'INSTALASI_FARMASI_RAWAT_JALAN', 'INSTALASI_FARMASI_RAWAT_INAP', 'FISIOTERAPI', 'REKAM_MEDIS', 'RUANG_SERVER_DAN_IT_SUPPORT', 'MANAJEMEN_DAN_ADMIN', 'KEUANGAN', 'FRONT_OFFICE', 'BACK_OFFICE', 'HRD_DAN_DIKLAT', 'KAMAR_OPERASI_IBS', 'KAMAR_BERSALIN', 'IPSRS', 'KEAMANAN_DAN_KETERTIBAN', 'SANITASI_DAN_KEBERSIHAN', 'LAUNDRY', 'SUPIR_AMBULANCE', 'CLEANING_SERVICE');
ALTER TABLE "Staff" ALTER COLUMN "kategoriUnitkerja" TYPE "kategoriUnitkerja_new" USING ("kategoriUnitkerja"::text::"kategoriUnitkerja_new");
ALTER TYPE "kategoriUnitkerja" RENAME TO "kategoriUnitkerja_old";
ALTER TYPE "kategoriUnitkerja_new" RENAME TO "kategoriUnitkerja";
DROP TYPE "public"."kategoriUnitkerja_old";
COMMIT;

-- CreateTable
CREATE TABLE "KinerjaStaff" (
    "id" SERIAL NOT NULL,
    "targetTB" TEXT NOT NULL,
    "targetKP" TEXT NOT NULL,
    "realisasiTB" TEXT NOT NULL,
    "realisasiKP" TEXT NOT NULL,
    "capaianTB" TEXT NOT NULL,
    "capaianKP" TEXT NOT NULL,
    "integritas" TEXT NOT NULL,
    "disiplin" TEXT NOT NULL,
    "skpTKP" TEXT NOT NULL,
    "skpRealisasi" TEXT NOT NULL,
    "skpPredikat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KinerjaStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diklat" (
    "id" SERIAL NOT NULL,
    "namaKegiatan" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "durasi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diklat_pkey" PRIMARY KEY ("id")
);
