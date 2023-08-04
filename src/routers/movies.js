import { Router } from "express";
import { addMovies, deleteMovie, getAllMovies, getMovie, updateMovies } from "../contronllers/movies.js";
import { checkPermission } from "../middleware/premission.js";
const router = Router()

router.get("/", getAllMovies)
router.get("/:id", getMovie)
router.post('/', checkPermission, addMovies)
router.put('/:id', checkPermission, updateMovies)
router.delete('/:id', checkPermission, deleteMovie)
export default router