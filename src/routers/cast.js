import { Router } from "express"
import { getCastMovies } from "../contronllers/cast.js"
const router = new Router

router.get("/", getCastMovies)


export default router