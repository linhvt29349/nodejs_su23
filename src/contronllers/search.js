import Movies from "../models/movies.js";

export const searchMovies = async (req, res) => {
    try {
        const { valueSearch } = req.query;
        const result = await Movies.findOne({ $text: { $search: valueSearch } }).populate("category_id")

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
    res.end();
}