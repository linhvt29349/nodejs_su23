import Joi from "joi"
const movies = [
    {
        "id": 1,
        "category_id": '64c7dfc525c142e1da98c5c6',
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
        "href": "The_Grudge_(2020_film)",
        "extract": "The Grudge is a 2020 American psychological supernatural horror film written and directed by Nicolas Pesce. Originally announced as a reboot of the 2004 American remake and the original 2002 Japanese horror film Ju-On: The Grudge, the film ended up taking place before and during the events of the 2004 film and its two direct sequels, and is the fourth installment in the American The Grudge film series. The film stars Andrea Riseborough, Demián Bichir, John Cho, Betty Gilpin, Lin Shaye, and Jacki Weaver, and follows a police officer who investigates several murders that are seemingly connected to a single house.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/3/34/The_Grudge_2020_Poster.jpeg",
    },
    {
        "id": 2,
        "category_id": "64c7dfc525c142e1da98c5c6",
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
        "category_id": '64c7d998cdf2f071b0100a62',
        "title": "Like a Boss",
        "year": 2020,
        "cast": [
            "Tiffany Haddish",
            "Rose Byrne",
            "Salma Hayek",
            "Jennifer Coolidge",
            "Billy Porter"
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
        "href": "Three_Christs",
        "extract": "Three Christs, also known as State of Mind, is a 2017 American drama film directed, co-produced, and co-written by Jon Avnet and based on Milton Rokeach's nonfiction book The Three Christs of Ypsilanti. It screened in the Gala Presentations section at the 2017 Toronto International Film Festival. The film is also known as: Three Christs of Ypsilanti, The Three Christs of Ypsilanti, Three Christs of Santa Monica, and The Three Christs of Santa Monica.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/a/a1/Three_Christs_poster.jpg",
    }
]
const html = movies.map(product => product.cast).flat();
let obj = {};
Array.from(new Set(html)).map((element, index) => {
    obj[index] = { id: Date.now() + index, name: element }
});
obj = Object.entries(obj).map(product => product.slice(1))
const genres = obj.flat()

const shima = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "{#label} Required field!"
    })
})
export const getGenres = (req, res) => {
    if (genres) {
        res.status(200).send(genres)
    } else {
        res.status(500).send({
            message: 'Server error!'
        })
    }

    res.end()
}
export const getOneGenres = (req, res) => {
    const id = Number(req.params.id);
    if (id) {
        const name1 = genres.find(element => element.id === id)
        res.status(200).send(name1)
    } else {
        res.status(404).send({
            message: 'The genre does not exist!'
        })
    }
}
export const addGenres = (req, res) => {
    const data = req.body
    const { error } = shima.validate(data, { abortEarly: false })
    const nameSame = genres.findIndex(item => item.name === req.body.name);
    if (error) {
        res.status(400).send({
            "message": error.details[0].message
        })
    } else if (nameSame !== -1) {
        res.status(404).send({
            "message": 'The genre already exists!'
        })
    } else {
        genres.push({ ...data, id: Date.now() })
        res.status(201).send({
            message: 'The genre was added successfully!',
            data: genres[genres.length - 1]
        })
    }

}
export const removeGenres = (req, res) => {
    const id = Number(req.params.id)
    const indexRemove = genres.findIndex(element => element.id === id)
    if (indexRemove > 0) {
        genres.splice(indexRemove, 1)
        res.status(200).send({
            "message": "The genre was deleted successfully!"
        })
    } else {
        res.status(404).send({
            "message": "The genre was not exists!"
        })
    }
}
export const updateGenres = (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const { error } = shima.validate(data, { abortEarly: false })
    const index = genres.findIndex(element => element.id === id)
    if (error) {
        res.status(400).send({
            message: error.details[0].message
        })
    } else if (index < 0) {
        res.status(404).send({
            message: 'The genre does not exist!'
        })
    } else {
        genres[index] = { ...genres[index], ...data }
        res.status(200).send({
            message: 'The genre updated successfully!',
            data: genres[genres.length - 1]
        })
    }
}