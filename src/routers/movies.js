import { Router } from "express";
import { addMovies, deleteMovie, getAllMovies, getMovie, updateMovies } from "../contronllers/movies.js";
const router = Router()

router.get("/", getAllMovies)
router.get("/:id", getMovie)
router.post('/', addMovies)
router.put('/:id', updateMovies)
router.delete('/:id', deleteMovie)
export default router