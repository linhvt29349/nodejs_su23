import { Router } from "express";
import singup from "../contronllers/user.js";

const router = Router();

router.post('/', singup)
export default router;