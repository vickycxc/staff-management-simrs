import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma.ts";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "TOKEN_TIDAK_DITEMUKAN" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("id" in decoded)
    ) {
      return res.status(401).json({ message: "TOKEN_TIDAK_VALID" });
    }

        const admin = await prisma.admin.findUnique({
          where: { id: decoded.id },
        });
        if (!admin) {
          return res.status(401).json({ message: "PENGGUNA_TIDAK_DITEMUKAN" });
        }
        req.admin = admin;
        return next();


  } catch (error) {
    console.error("Error di protectRoute middleware", error);
    return res.status(500).json({
      message: "INTERNAL_ERROR",
    });
  }
};
