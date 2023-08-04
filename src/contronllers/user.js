import User from "../models/user.js";
import Joi from 'joi'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const signupSchema = Joi.object({
    lastname: Joi.string().required().messages({
        "string.empty": "{#lable}Required field!"
    }),
    firstname: Joi.string().required().messages({
        "string.empty": "{#lable}Required field!"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "{#lable}Required field!",
        "string.email": "{#lable}Email invalidate!",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "{#lable}Required field!",
        "string.min": "{#lable}Password at least 8 characters!",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "{#lable}Password incorrect!"
    }),
    isAdmin: Joi.boolean()
})
const singinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "{#lable}Required field!",
        "string.email": "{#lable}Email invalidate!",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "{#lable}Required field!",
        "string.min": "{#lable}Password at least 8 characters!",
    })
})
export const singup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false })
        if (!error) {
            const { lastname, firstname, email, password } = req.body
            const hash = bcrypt.hashSync(password, 10);
            const user = await User.create({ lastname, firstname, email, password: hash })
            res.status(200).json({
                "message": "Sign Up Success!",
                data: user
            })
            res.end()
        }
        const user = await User.findOne({ email: email })
        if (user) {
            res.status(400).json({
                "message": "The category does exist!",
            })
            res.end()
        }
        const messages = error.details.map(item => item.message)
        res.status(400).json({
            message: messages
        })
        res.end()
    } catch (err) {
        res.status(500).json({
            "message": "Server error!"
        })
    }
}

export const singin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        const { error } = singinSchema.validate(req.body, { abortEarly: false })
        if (error) {
            res.status(400).json({
                message: error.details?.map(e => e.message)
            })
            res.end()
        }
        if (!user) {
            res.status(401).json({
                "message": "User does not exist!"
            })
            res.end()
        }
        const check = bcrypt.compareSync(password, user.password)
        if (!check) {
            res.status(401).json({
                "message": "Invalid email or password!"
            })
            res.end()
        }
        const token = jwt.sign({ _id: user._id }, "wd18101", {
            expiresIn: "1d"
        })

        res.status(200).json({
            "message": "Sign In Success!",
            accessToken: token
        })
        res.end()
    } catch (error) {
        res.status(500).json({
            " message": "Server error!"
        })
    }
}