/*
  Warnings:

  - A unique constraint covering the columns `[nip]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Staff_nip_key" ON "Staff"("nip");
