import mongoose from "mongoose";
const { Schema } = mongoose

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})
const User = mongoose.model('user', UserSchema)
export default User