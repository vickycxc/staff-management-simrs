import type { Request, Response } from 'express';
import prisma from '../lib/prisma.ts';

export const getKinerjaStaff = async (req: Request, res: Response) => { 
    try {
        const staffList = await prisma.staff.findMany({
            include: {
                kinerjaStaff: {
                    include: {
                        diklat: true,
                    },
                },
            },
        });
        
        return res.status(200).json({ staffList });
    } catch (error) {
        console.error("Error di getKinerjaStaff controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
}
