import { Router } from "express"
import { getGenres } from "../contronllers/genres.js"
const router = new Router

router.get("/", getGenres)


export default router