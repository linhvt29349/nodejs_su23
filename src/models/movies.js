import mongoose from 'mongoose';

const { Schema } = mongoose;

const MoviesSchema = new Schema({
    title: String,
    year: Number,
    category_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorys"
    }],
    cast: [String],
    extract: String

});
const Movies = mongoose.model("movies", MoviesSchema);

export default Movies
