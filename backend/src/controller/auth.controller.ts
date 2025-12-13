import type { Request, Response } from 'express';
import prisma from '../lib/prisma.ts';
import bcrypt from 'bcryptjs';

export const masuk = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ pesanError: "TIDAK_ADA_HEADER" });
    }
    const { id, password } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ pesanError: "ID_KOSONG" });
        }
        if (!password) {
            return res.status(400).json({ pesanError: "PASSWORD_KOSONG" });
        }

        const pengguna = await prisma.pengguna.findUnique({
            where: { id }
        });

        if (!pengguna) {
            return res.status(404).json({ pesanError: "PENGGUNA_TIDAK_DITEMUKAN" });
        }

        const { password: penggunaPassword, ...userWithoutPassword } = pengguna;
        const isPasswordCorrect = await bcrypt.compare(password, penggunaPassword) ;
        if (!isPasswordCorrect) {
            return res.status(401).json({ pesanError: "PASSWORD_SALAH" });
        }
        return res.status(200).json({
            penggunaPassword
            

        });
    } catch (error) {
        console.error("Error di masuk controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
}