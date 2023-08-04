import { Router } from "express";
import { searchMovies } from "../contronllers/search.js";

const router = Router();

router.get('/', searchMovies)
export default router