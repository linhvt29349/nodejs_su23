import { Router } from "express"
import { addCast, getCastMovies, updateCast, removeCast, getOneCast } from "../contronllers/cast.js"
const router = new Router

router.get("/", getCastMovies)
router.post('/', addCast)
router.delete('/:id', removeCast)
router.get('/:id', getOneCast)
router.put('/:id', updateCast)

export default router