import express from 'express';
import { masuk, daftar } from '../controller/auth.controller.ts';


const router = express.Router();
router.post('/masuk', masuk);
router.post('/daftar', daftar);

export default router;
