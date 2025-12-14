import express from 'express';
import { getPerawat, totalPenunjangMedis, totalUmum, totalDinas, shiftPagi, shiftSore, shiftMalam } from '../controller/dashboard.controller.ts';

const router = express.Router();
router.get('/total-perawat', totalPerawat);
router.get('/total-penunjang-medis', totalPenunjangMedis);
router.get('/total-umum', totalUmum);
router.get('/total-dinas', totalDinas);
router.get('/shift-pagi', shiftPagi);
router.get('/shift-sore', shiftSore);
router.get('/shift-malam', shiftMalam);

export default router;
