import jwt from 'jsonwebtoken';


export const generateToken = (id: number) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY!, { 
        expiresIn:'7d'
    });
};

export default jwt;