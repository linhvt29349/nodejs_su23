import Joi from "joi";
import Category from "../models/categories.js";

const validateSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.emtry": "{#lable} Required field!"
    })
})
export const getCategorys = async (req, res) => {
    try {
        const result = await Category.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            "message": "Server error! "
        })
    }
    res.end()
}
export const getOneCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Category.findById(id);
        if (!result) {
            res.status(404).send({
                "message": "The category does not exist!"
            })
            res.end()
        }
        res.status(200).send(result)
        res.end()

    } catch (error) {
        res.status(500).send({
            "message": "Server error! "
        })
    }

}
export const addCategory = async (req, res) => {
    try {
        const { error } = validateSchema.validate(req.body, { abortEarly: false })
        const nameSame = await Category.findOne({ name: req.body.name })
        if (error) {
            res.status(400).send({
                message: error.details?.map(e => e.message)
            })
            res.end()
        }
        if (nameSame) {
            res.status(400).send({
                "message": "The category does exist!",
            })
            res.end()
        }
        const movie = await Category.create(req.body)
        res.status(200).send({
            massage: "The category was created successfully!",
            data: movie
        })
        res.end()
    } catch (err) {
        res.status(500).send({
            "message": "Server error!"
        })
    }
}
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = validateSchema.validate(req.body, { abortEarly: false })
        const idSame = await Category.findOne({ _id: id })
        if (!idSame) {
            res.status(404).json({
                "message": "The category does not exist!"
            })
            res.end()
        }
        if (error) {
            res.status(400).json({
                message: error.details?.map(mes => mes.message)
            })
            res.end()
        }
        const result = await Category.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            message: "The movie was updated successfully!",
            data: result
        })
        res.end()
    } catch (error) {
        res.status(500).send({
            " message": "Server error!"
        })
    }
}
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = validateSchema.validate(req.body, { abortEarly: false })
        if (error) {
            res.status(400).send({
                message: error.details?.map(mes => mes.message)
            })
            res.end()
        }
        if (!id) {
            res.status(404).send({
                "message": "The category does not exist!"
            })
            res.end()
        }
        const result = await Category.findByIdAndDelete(id)
        res.status(200).send({
            message: "The movie was deleted successfully!"
        })
        res.end()
    } catch (error) {
        res.status(500).send({
            " message": "Server error!"
        })
    }
}
