import { Router } from "express"
import { addGenres, getGenres, getOneGenres, removeGenres, updateGenres } from "../contronllers/genres.js"
const router = new Router

router.get("/", getGenres)
router.get('/:id', getOneGenres)
router.put('/:id', updateGenres)
router.post('/', addGenres)
router.delete('/:id', removeGenres)

export default router