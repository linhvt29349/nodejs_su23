import { Router } from "express";
import { singin, singup } from "../contronllers/user.js";

const router = Router();

router.post('/singup', singup)
router.post('/singin', singin)
export default router;