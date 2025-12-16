import express from 'express';
import { getStaff, updateStaff, addStaff, deleteStaff } from '../controller/staff.controller.ts';
import { protectRoute, } from '../middleware/auth.middleware.ts';

// import { getPerawatDanBidan, getPenunjangMedis, getNonMedis, getMedis, getShiftPagi, shiftSore, shiftMalam } from '../controller/dashboard.controller.ts';

const router = express.Router();
router.get('/', protectRoute, getStaff);
router.post('/', protectRoute, addStaff);
router.put('/', protectRoute, updateStaff);
router.delete('/', protectRoute, deleteStaff);


export default router;
