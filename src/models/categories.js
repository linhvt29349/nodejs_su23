import mongoose from "mongoose";

const { Schema } = mongoose;
const schemaCategory = new Schema({
    name: String

})
const Category = mongoose.model('categorys', schemaCategory);
export default Category
