import User from "../models/user.js";
import Joi from 'joi'
import bcrypt from "bcrypt"

const signupSchema = Joi.object({
    lastname: Joi.string().required().messages({
        "string.empty": "Dữ liệu bắt buộc"
    }),
    firstname: Joi.string().required().messages({
        "string.empty": "Dữ liệu bắt buộc"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Dữ liệu bắt buộc",
        "string.email": "Email không đúng định dạng",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Dữ liệu bắt buộc",
        "string.min": "Dữ liệu tối thiểu 8 ký tự",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "Mật khẩu không khớp"
    })
})
const singup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false })
        if (!error) {
            const { lastname, firstname, email, password } = req.body
            const hash = bcrypt.hashSync(password, 10);
            const user = await User.create({ lastname, firstname, email, password: hash })
            res.send({
                message: "Đăng ký thành công",
                data: user
            })
        } else {
            const messages = error.details.map(item => item.message)
            res.status(400).send({
                message: messages
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra"
        })
    }
    res.end()

}

export default singup