import express from 'express';
import { masuk } from '../controller/auth.controller.ts';

const router = express.Router();
router.post('/masuk',masuk);
//router.post('/register', register);

export default router;
