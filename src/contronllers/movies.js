import Joi from 'joi'
import { __dirname } from '../server.js'
import Movies from '../models/movies.js'


const productValidate = Joi.object({
    title: Joi.string().trim().required().messages({
        "string.empty": "{#label} Required field!"
    }),
    year: Joi.number().integer().min(0).required().messages({
        "string.empty": "{#label} Required field!",
        "string.min": "{#label} Tối thiểu 1 kí tự!"
    }),
    cast: Joi.array().items(Joi.string().min(1)).required().messages({
        "string.empty": "{#label} Required field!"
    }),
    genres: Joi.array().items(Joi.string()).required().messages({
        "string.empty": "{#label} Required field!",
    }),
    extract: Joi.string().trim().required().messages({
        "string.empty": "{#label} Required field!"
    }),
    href: Joi.string().trim(),
    thumbnail: Joi.string().trim()
})
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movies.find()
        res.status(200).send(movies)
    } catch (error) {
        res.status(500).send({
            "message": "Server error! "
        })
    }

    res.end()
}
export const addMovies = async (req, res) => {
    try {
        const movies = await Movies.find()
        const data = req.body;
        const { error } = productValidate.validate(data, { abortEarly: false })
        const nameSame = movies.findIndex(item => item.title === req.body.title);
        if (error) {
            res.status(400).send({
                message: error.details?.map(e => e.message)
            })
        } else if (nameSame !== -1) {
            res.status(400).send({
                "message": "The cast does exist!",
            })
            res.end()
        } else {
            const newMovie = await Movies.create(data)
            res.status(201).send({
                "message": "The movie was created successfully!",
                data: newMovie
            })
        }
    } catch (err) {
        res.status(500).send({
            "message": "Server error! "
        })
    }
    res.end();
}
export const updateMovies = async (req, res) => {
    try {
        const movies = await Movies.find()
        const { id } = req.params;
        const movieIndex = movies.findIndex(movie => movie.id === id);
        const { error } = productValidate.validate(req.body, { abortEarly: false })

        if (error) {
            res.status(400).send({
                message: error.details?.map(e => e.message)
            })
        } else if (movieIndex < 0) {
            res.status(404).send({
                "message": "The movie does not exist!"
            })
        } else {
            const movieUpdate = await Movies.findOneAndUpdate(id, req.body)
            res.status(200).send({
                message: 'The movie was updated successfully!',
                data: movieUpdate
            })
        }
    } catch (error) {
        res.status(500).send({
            "message": "Server error! "
        })
    }

    res.end();
}
export const deleteMovie = async (req, res) => {
    try {
        const movies = await Movies.find()
        const { id } = req.params;
        const movieIndex = movies.findIndex(movie => movie.id === id);

        if (movieIndex !== -1) {
            const deleteMovie = await Movies.findByIdAndDelete(id)
            res.status(200).send({
                "message": "The movie was deleted successfully!"
            })
        } else {
            res.status(404).send({
                "message": "The movie does not exist!"
            })
        }
    } catch (error) {
        res.status(500).send({
            "message": "Server error! "
        })
    }
    res.end();
}
export const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const html = await Movies.findById(id);
            res.status(200).send(html)
        } else {
            res.status(404).send({
                "message": "The movie does not exist!"
            })
        }
    } catch (error) {
        res.status(500).send({
            "message": "Server error! "
        })
    }

    res.end()
}
// export const getAddMovie = (req, res) => {
//     const html = fs.readFileSync(path.join(__dirname, './pages/movies/add.html'), 'utf8')
//     res.send(html)
//     res.end()
// }

