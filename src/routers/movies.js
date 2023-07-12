import { Router } from "express";
import { addMovies, deleteMovie, getAddMovie, getAllMovies, getMovie, getUpdateMovie, updateMovies } from "../contronllers/movies.js";
const router = Router()

router.get("/", getAllMovies)

router.get("/add", getAddMovie)
router.get("/update/:id", getUpdateMovie)
router.get('/product/:id', getMovie)

router.post('/', addMovies)
router.put('/update/:id', updateMovies)
router.delete('/delete/:id', deleteMovie)
export default router