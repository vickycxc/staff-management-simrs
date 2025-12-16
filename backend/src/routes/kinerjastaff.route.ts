import express from 'express';
import { getKinerjaStaff } from '../controller/kinerjastaff.controller.ts';
import { protectRoute, } from '../middleware/auth.middleware.ts'

const router = express.Router();
router.get('/', protectRoute, getKinerjaStaff);


export default router;
