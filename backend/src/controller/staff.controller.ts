import type { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../lib/prisma.ts';


const uploadSip = async (profilePicture: any) : Promise<string | null> => {
  try {

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    return uploadResponse.secure_url;
  } catch (error) {
    console.error(
      "Gagal Mengunggah Foto Profil, Error di uploadProfilePicture controller",
      error
    );
    return null;
  }
};

export const getStaff = async (req: Request, res: Response) => {
    try {
        const staffList = await prisma.staff.findMany({
            where: {
                deletedAt: {
                    equals: null
                }
            }
        });
        
        return res.status(200).json({ staffList });
    } catch (error) {
        console.error("Error di getKinerjaStaff controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
}

export const updateStaff = async (req: Request, res: Response) => {
    if (!req.body) {
            return res.status(400).json({ pesanError: "TIDAK_ADA_HEADER" });
    }
    const { id, namaLkG, nip, jenisKelamin, alamat, noTelp, email, kategoriProfesi, kategoriUnitKerja, jabatanSpesifik, statusKepegawaian, peran, sip } = req.body; 
    console.log("body update", req.body)
    try {
        if ( !namaLkG || !nip || !jenisKelamin || !alamat || !noTelp ||  !email || !kategoriProfesi || !kategoriUnitKerja || !jabatanSpesifik || !statusKepegawaian || !peran) {
            return res.status(400).json({ pesanError: "TIDAK_LENGKAP" });
        }
        let sipUrl: string | null = null;
        if (sip != null ) {
            sipUrl = await uploadSip(sip);
        }
        const staffDiperbarui = await prisma.staff.update({
        where: {
nip},            data: {
                namaLkG,
                nip,
                jenisKelamin,
                alamat,
                noTelp,
                email,
                kategoriProfesi,
                kategoriUnitKerja,
                jabatanSpesifik,
                statusKepegawaian,
                peran,
                sipUrl,
            }
             });
            return res.status(200).json({ staffDiperbarui });
    
    } catch (error) {
        console.error("Error di masuk controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }

}

export const addStaff = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ pesanError: "TIDAK_ADA_HEADER" });
    }
    const { namaLkG, nip, jenisKelamin, alamat, noTelp, email, kategoriProfesi, kategoriUnitKerja, jabatanSpesifik, peran, sip } = req.body;
    try {
        if (!namaLkG || !nip || !jenisKelamin || !alamat || !noTelp ||  !email || !kategoriProfesi || !kategoriUnitKerja || !jabatanSpesifik || !peran) {
            console.log(req.body)
            return res.status(400).json({ pesanError: "TIDAK_LENGKAP" });
        }

        let sipUrl: string | null = null;
        if (sip != null ) {
            sipUrl = await uploadSip(sip);
        }
        const staffBaru = await prisma.staff.create({
            data: {
                namaLkG,
                nip,
                jenisKelamin,
                alamat,
                noTelp,
                email,
                kategoriProfesi,
                kategoriUnitKerja,
                jabatanSpesifik,
                statusKepegawaian: "PEGAWAI_TETAP",
                peran,
                sipUrl,
                kinerjaStaff: {
                    create: {
                        targetTimePasienBaru: "5 menit",
                        targetKepuasanPasien: "90%",
                        realisasiTimePasienBaru: "3 menit",
                        realisasiKepuasanPasien: "92%",
                        capaianTimePasienBaru: "95%",
                        capaianKepuasanPasien: "100%",
                        integritas: "90",
                        disiplin: "88",
                        skpTKP: "50",
                        skpRealisasi: "25",
                        skpPredikat: "Baik",
                        diklat: {
                            create: [{
                                namaKegiatan: "Simposium Penyakit Dalam 2023",
                                tanggal: "2023-05-10",
                                jenis: "Seminar",
                                durasi: "2 hari",
                            }]
                        }
                }
            }
        }});

            return res.status(201).json({ staffBaru });

    } catch (error) {
        console.error("Error di masuk controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
}

export const deleteStaff = async (req: Request, res: Response) => {
      if (!req.body) {
            return res.status(400).json({ pesanError: "TIDAK_ADA_HEADER" });
    }
    const {id} = req.body;
    try {
        if (!id) {
            return res.status(400).json({ pesanError: "ID_KOSONG" });
        }
        const staffDihapus = await prisma.staff.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
                    return res.status(200).json({ staffDihapus });
    } catch (error) {
        console.error("Error di masuk controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
}
