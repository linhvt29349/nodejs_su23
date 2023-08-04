import jwt from 'jsonwebtoken'
import User from '../models/user.js';

export const checkPermission = async (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")[1]

        if (!token) {
            res.status(401).json({
                message: "User authentication error!"
            })
            return;
        };
        const decoded = jwt.verify(token, 'wd18101')

        if (!decoded) {
            res.status(401).json({
                message: "User authentication error!"
            })
            return;
        }
        const _id = decoded._id
        const user = await User.findById(_id)
        console.log(user);
        if (!user.isAdmin) {
            res.status(401).json({
                message: "No resource access!"
            })
            return;
        }
        next()
    } catch (err) {

        res.status(500).json({
            message: "Server error!"
        })
    }
}