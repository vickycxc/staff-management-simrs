import jwt from 'jsonwebtoken';
import type { Response } from 'express';


export const generateToken = (id: number, res: Response) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY!, { 
        expiresIn:'7d'
    });
    
    res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
  });

  return token;
};

export default jwt;