import type { Request, Response } from 'express';
import prisma from '../lib/prisma.ts';

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const penggunaCount = await prisma.admin.count();
        return res.status(200).json({ penggunaCount });
    } catch (error) {
        console.error("Error di getDashboardData controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};

export const getPerawatDanBidan = async (req: Request, res: Response) => {   
    try {
        const perawatDanBidan = await prisma.staff.findMany({
            where: { peran: 'PERAWAT_DAN_BIDAN' }
        });
        return res.status(200).json({ getPerawatDanBidan: perawatDanBidan });
    } catch (error) {
        console.error("Error di getPerawatDanBidan controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};
export const getPenunjangMedis = async (req: Request, res: Response) => {   
    try {
        const PenunjangMedis = await prisma.staff.findMany({
            where: { peran: 'PENUNJANG_MEDIS' }
        });
        return res.status(200).json({ getPenunjangMedis: PenunjangMedis });
    } catch (error) {
        console.error("Error di getPenunjangMedis controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};
export const getNonMedis = async (req: Request, res: Response) => {   
    try {
        const NonMedis = await prisma.staff.findMany({
            where: { peran: 'NON_MEDIS' }
        });
        return res.status(200).json({ getNonMedis: NonMedis });
    } catch (error) {
        console.error("Error di getNonMedis controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};
export const getMedis = async (req: Request, res: Response) => {   
    try {
        const Medis = await prisma.staff.findMany({
            where: { peran: 'MEDIS' }
        });
        return res.status(200).json({ getMedis: Medis });
    } catch (error) {
        console.error("Error di getMedis controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
};

// export const getShiftPagi = async (req: Request, res: Response) => {   
//     try {
//         const shiftPagi = await prisma.staff.({