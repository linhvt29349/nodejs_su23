
const movies = [
    {
        "id": 1,
        "title": "The Grudge",
        "year": 2020,
        "cast": [
            "Andrea Riseborough",
            "Demián Bichir",
            "John Cho",
            "Betty Gilpin",
            "Lin Shaye",
            "Jacki Weaver"
        ],
        "genres": [
            "Horror",
            "Supernatural"
        ],
        "href": "The_Grudge_(2020_film)",
        "extract": "The Grudge is a 2020 American psychological supernatural horror film written and directed by Nicolas Pesce. Originally announced as a reboot of the 2004 American remake and the original 2002 Japanese horror film Ju-On: The Grudge, the film ended up taking place before and during the events of the 2004 film and its two direct sequels, and is the fourth installment in the American The Grudge film series. The film stars Andrea Riseborough, Demián Bichir, John Cho, Betty Gilpin, Lin Shaye, and Jacki Weaver, and follows a police officer who investigates several murders that are seemingly connected to a single house.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/3/34/The_Grudge_2020_Poster.jpeg",
    },
    {
        "id": 2,
        "title": "Underwater",
        "year": 2020,
        "cast": [
            "Kristen Stewart",
            "Vincent Cassel",
            "Jessica Henwick",
            "John Gallagher Jr.",
            "Mamoudou Athie",
            "T.J. Miller"
        ],
        "genres": [
            "Action",
            "Horror",
            "Science Fiction"
        ],
        "href": "Underwater_(film)",
        "extract": "Underwater is a 2020 American science fiction action horror film directed by William Eubank. The film stars Kristen Stewart, Vincent Cassel, Jessica Henwick, John Gallagher Jr., Mamoudou Athie, and T.J. Miller.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/4/4a/Underwater_poster.jpeg",
    },
    {
        "id": 3,
        "title": "Like a Boss",
        "year": 2020,
        "cast": [
            "Tiffany Haddish",
            "Rose Byrne",
            "Salma Hayek",
            "Jennifer Coolidge",
            "Billy Porter"
        ],
        "genres": [
            "Comedy"
        ],
        "href": "Like_a_Boss_(film)",
        "extract": "Like a Boss is a 2020 American comedy film directed by Miguel Arteta, written by Sam Pitman and Adam Cole-Kelly, and starring Tiffany Haddish, Rose Byrne, and Salma Hayek. The plot follows two friends who attempt to take back control of their cosmetics company from an industry titan.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/9/9a/LikeaBossPoster.jpg",
    },
    {
        "id": 4,
        "title": "Three Christs",
        "year": 2020,
        "cast": [
            "Richard Gere",
            "Peter Dinklage",
            "Walton Goggins",
            "Bradley Whitford"
        ],
        "genres": [
            "Drama"
        ],
        "href": "Three_Christs",
        "extract": "Three Christs, also known as State of Mind, is a 2017 American drama film directed, co-produced, and co-written by Jon Avnet and based on Milton Rokeach's nonfiction book The Three Christs of Ypsilanti. It screened in the Gala Presentations section at the 2017 Toronto International Film Festival. The film is also known as: Three Christs of Ypsilanti, The Three Christs of Ypsilanti, Three Christs of Santa Monica, and The Three Christs of Santa Monica.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/a/a1/Three_Christs_poster.jpg",
    }
]

export const getAllMovies = (req, res) => {
    if (movies) {
        res.status(200).send(movies)
    } else {
        res.status(500).send({
            "message": "Server "
        })
    }
    res.end()
}
export const addMovies = (req, res) => {
    movies.push({ ...req.body, id: Date.now() })
    res.send(movies)
    res.end();
}
export const updateMovies = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex !== -1) {
        movies[movieIndex] = { ...movies[movieIndex], ...data }
        res.send(movies[movieIndex])
    } else {
        res.status(404).send("Phim không tồn tại!")
    }

    res.end();
}
export const deleteMovie = (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        res.json(movies)
    } else {
        res.status(404).send("Phim không tồn tại!")
    }
    res.end();
}
export const getMovie = (req, res) => {
    const html = movies.filter((product) => product.id == +req.params.id);
    res.send(html)
    res.end()
}
export const getAddMovie = (req, res) => {
    const html = fs.readFileSync('./src/pages/add.html', 'utf-8')
    res.send(html)
    res.end()
}

export const getUpdateMovie = (req, res) => {
    const html = fs.readFileSync('./src/pages/update.html', 'utf-8')
    res.send(html)
    res.end()
}