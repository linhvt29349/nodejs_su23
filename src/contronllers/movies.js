import Joi from 'joi'
import { __dirname } from '../server.js'
import Movies from '../models/movies.js'
import Category from '../models/categories.js'


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
    extract: Joi.string().trim().required().messages({
        "string.empty": "{#label} Required field!"
    }),
    href: Joi.string().trim(),
    thumbnail: Joi.string().trim(),
    category_id: Joi.array().items(Joi.string()).required().messages({
        "string.empty": "{#label} Required field!",
    })
})
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movies.find().populate("category_id")
        res.status(200).json(movies)
    } catch (error) {
        res.status(500).json({
            message: "Server error! "
        })
    }
}
export const addMovies = async (req, res) => {
    try {
        const { error } = productValidate.validate(req.body, { abortEarly: false })
        const nameSame = await Movies.findOne({ title: req.body.title })
        if (error) {
            res.status(400).json({
                message: error.details?.map(e => e.message)
            })
            res.end()
        }
        if (nameSame) {
            res.status(400).json({
                "message": "The movie does exist!",
            })
            res.end()
        }
        const movie = await (await Movies.create(req.body)).populate("category_id")

        // if (req.body.category_id) {
        //     await Category.updateMany({ _id: req.body.category_id }, { $addToSet: { movie_id: movie._id } })
        //     res.end()
        // }
        res.status(200).json({
            massage: "The movie was created successfully!",
            data: movie
        })
        res.end()
    } catch (err) {
        res.status(500).json({
            message: "Server error!"
        })
    }

}
export const updateMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = productValidate.validate(req.body, { abortEarly: false })
        const idSame = await Movies.findOne({ _id: id })
        if (!idSame) {
            res.status(404).json({
                "message": "The movie does not exist!"
            })
            res.end()
        }
        if (error) {
            res.status(400).json({
                message: error.details?.map(e => e.message)
            })
            res.end();
        }
        const movieUpdate = await Movies.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            message: 'The movie was updated successfully!',
            data: movieUpdate
        })
        res.end()
    } catch (error) {
        res.status(500).json({
            "message": "Server error! "
        })
    }
    res.end();

}
export const deleteMovie = async (req, res) => {
    try {

        const { id } = req.params;
        const movieIndex = await Movies.findById(id)

        if (movieIndex) {
            const deleteMovie = await Movies.findByIdAndDelete(id)
            res.status(200).json({
                message: "The movie was deleted successfully!"
            })
        } else {
            res.status(404).json({
                message: "The movie does not exist!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error! "
        })
    }
    res.end();
}
export const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const html = await Movies.findById(id).populate("category_id");
        if (html) {
            res.status(200).json(html)
        } else {
            res.status(404).json({
                message: "The movie does not exist!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error! "
        })
    }

    res.end()
}
// export const getAddMovie = (req, res) => {
//     const html = fs.readFileSync(path.join(__dirname, './pages/movies/add.html'), 'utf8')
//     res.json(html)
//     res.end()
// }

