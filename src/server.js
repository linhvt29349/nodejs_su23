import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import movieRouter from './routers/movies.js'
import uploadRouter from './routers/upload.js'
import castRouter from './routers/cast.js'
import genresRouter from './routers/genres.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const port = 8081
const app = express()

//app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//static
app.use(express.static('./src/public'))

//router
app.use('/movies', movieRouter)
app.use('/upload', uploadRouter)
app.use('/cast', castRouter)
app.use('/genres', genresRouter)
app.listen(port, () => {
    console.log(`Running is ${port}`);

})