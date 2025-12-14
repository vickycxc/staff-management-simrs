import type { Request, Response } from 'express';
import prisma from '../lib/prisma.ts';

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const penggunaCount = await prisma.pengguna.count();
        return res.status(200).json({ penggunaCount });
    } catch (error) {
        console.error("Error di getDashboardData controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};

export const totalPerawat = async (req: Request, res: Response) => {   
    try {
        const count = await prisma.pengguna.count({
            where: { peran: 'PERAWAT' }
        });
        return res.status(200).json({ totalPerawat: count });
    } catch (error) {
        console.error("Error di totalPerawat controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};
export const totalPenunjangMedis = async (req: Request, res: Response) => {   
    try {
        const count = await prisma.pengguna.count({
            where: { peran: 'PENUNJANG_MEDIS' }
        });
        return res.status(200).json({ totalPenunjangMedis: count });
    } catch (error) {
        console.error("Error di totalPenunjangMedis controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};
export const totalUmum = async (req: Request, res: Response) => {   
    try {
        const count = await prisma.pengguna.count({
            where: { peran: 'UMUM' }
        });
        return res.status(200).json({ totalUmum: count });
    } catch (error) {
        console.error("Error di totalUmum controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};
export const totalDinas = async (req: Request, res: Response) => {   
    try {
        const count = await prisma.pengguna.count({
            where: { peran: 'DINAS' }
        });
        return res.status(200).json({ totalDinas: count });
    } catch (error) {
        console.error("Error di totalDinas controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};
