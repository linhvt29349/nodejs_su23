import Joi from "joi"
import Movies from "../models/movies.js";

const productValidate = Joi.object({
    name: Joi.string().trim(true).required().messages({
        "string.empty": "{#label} Required field!"
    })
})
export const getCastMovies = async (req, res) => {
    const listCast = (await Movies.find()).map(product => product.cast.map(res => res)).flat()
    let obj = {};
    Array.from(new Set(listCast)).forEach((element, index) => {
        obj[index] = { id: Date.now() + index, name: element }
    });
    obj = Object.entries(obj).map(product => product.slice(1))
    const casts = obj.flat()

    if (casts) {
        res.status(200).send(casts)
    } else {
        res.status(500).send({
            message: "Server error!"
        })
    }

    res.end()
}
export const getOneCast = async (req, res) => {
    const listCast = (await Movies.find()).map(product => product.cast.map(res => res)).flat()
    let obj = {};
    Array.from(new Set(listCast)).forEach((element, index) => {
        obj[index] = { id: Date.now() + index, name: element }
    });
    obj = Object.entries(obj).map(product => product.slice(1))
    const casts = obj.flat()

    const { id } = req.params;
    if (id) {
        const name1 = await casts.findById(id)
        res.status(200).send(name1)
    } else {
        res.status(404).send({
            message: "The cast does not exist!"
        })
    }
    res.end()
}
export const addCast = async (req, res) => {
    const listCast = (await Movies.find()).map(product => product.cast.map(res => res)).flat()
    let obj = {};
    Array.from(new Set(listCast)).forEach((element, index) => {
        obj[index] = { id: Date.now() + index, name: element }
    });
    obj = Object.entries(obj).map(product => product.slice(1))
    const casts = obj.flat()

    const { error } = productValidate.validate(req.body, { abortEarly: false })
    const nameSame = casts.findIndex(item => item.name === req.body.name);

    if (error) {
        res.status(400).send({
            message: error.details?.map(e => e.message)
        })
        res.end()
    } else if (nameSame !== -1) {
        res.status(400).send({
            "message": "The cast does exist!",
        })
        res.end()
    } else {
        casts.push({ ...req.body, id: Date.now() })
        res.status(201).send({
            "message": "The cast was created successfully!",
            data: casts[casts.length - 1]
        })
        res.end()
    }
}
export const removeCast = async (req, res) => {
    const listCast = (await Movies.find()).map(product => product.cast.map(res => res)).flat()
    let obj = {};
    Array.from(new Set(listCast)).forEach((element, index) => {
        obj[index] = { id: Date.now() + index, name: element }
    });
    obj = Object.entries(obj).map(product => product.slice(1))
    const casts = obj.flat()

    const id = Number(req.params.id);
    const castIndex = casts.findIndex(movie => movie.id === id);

    if (castIndex > 0) {
        casts.splice(castIndex, 1);
        res.status(200).send({
            "message": "The cast was deleted successfully!"
        })
    } else {
        res.status(404).send({
            "message": "The cast does not exist!"
        })
    }
    res.end();
}
export const updateCast = async (req, res) => {
    const listCast = (await Movies.find()).map(product => product.cast.map(res => res)).flat()
    let obj = {};
    Array.from(new Set(listCast)).forEach((element, index) => {
        obj[index] = { id: Date.now() + index, name: element }
    });
    obj = Object.entries(obj).map(product => product.slice(1))
    const casts = obj.flat()

    const id = Number(req.params.id);
    const data = req.body;
    const movieIndex = casts.findIndex(movie => movie.id === id);
    const { error } = productValidate.validate(data, { abortEarly: false })
    if (error) {
        res.status(400).send({
            message: error.details?.map(e => e.message)
        })
    } else if (movieIndex < 0) {
        res.status(404).send({
            message: "The cast does not exist!"
        })
    } else {
        casts[movieIndex] = { ...casts[movieIndex], ...data }
        res.status(200).send({
            "message": "The cast was updated successfully!",
            data: casts[movieIndex]
        })
    }
    res.end();
}