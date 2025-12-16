import type { Request, Response } from 'express';
import prisma from '../lib/prisma.ts';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/jwt.ts';

//Masuk
export const masuk = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ pesanError: "TIDAK_ADA_HEADER" });
    }
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ pesanError: "EMAIL_KOSONG" });
        }
        if (!password) {
            return res.status(400).json({ pesanError: "PASSWORD_KOSONG" });
        }

        const admin = await prisma.admin.findUnique({
            where: { 
                email 
            }
        });

        if (!admin) {
            return res.status(404).json({ pesanError: "ADMIN_TIDAK_DITEMUKAN" });
        }

        const { password: passwordAdmin, ...adminTanpaPassword } = admin;
        const isPasswordCorrect = await bcrypt.compare(password, passwordAdmin) ;
        if (!isPasswordCorrect) {
            return res.status(401).json({ pesanError: "PASSWORD_SALAH" });
        }
        // const token = generateToken(adminTanpaPassword.id, res);
        return res.status(200).json({ 
            admin: adminTanpaPassword,
            // token
        });
    } catch (error) {
        console.error("Error di masuk controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }
}

//Daftar
export const daftar = async (req: Request, res: Response) => {
    const { nama, email, password } = req.body;
    try {
        if (!nama || !email || !password) {
            return res.status(400).json({ pesanError: " TIDAK_LENGKAP" });
        }
        if (password.length < 6) {
            return res.status(400).json({ pesanError: "KURANG_6_KARAKTER" });
        }
        
        // Check jika email sudah terdaftar
        const existingAdmin = await prisma.admin.findFirst({
             where: { 
                email 
            } 
        });
        if (existingAdmin) {
            return res.status(409).json({ pesanError: "EMAIL_SUDAH_DIGUNAKAN" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const adminBaru = await prisma.admin.create({
            data: {
                nama,  
                email,
                password: hashedPassword,
            },
        });
        const { password: _, ...adminTanpaPassword } = adminBaru;
            // const token = generateToken(adminTanpaPassword.id, res);
        return res.status(201).json({admin: adminTanpaPassword,
        });
    } catch (error) {
        console.error("Error di daftar controller:", error);
        return res.status(500).json({ pesanError: "INTERNAL_ERROR" });
    }}
