import mongoose from 'mongoose';

const { Schema } = mongoose;

const MoviesSchema = new Schema({
    title: String,
    year: Number,
    cast: [String],
    genres: [String],
    extract: String

});
const Movies = mongoose.model("movies", MoviesSchema);



export default Movies
