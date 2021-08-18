const express = require('express')
const app = express()
const path = require("path")
const bodyParser = require('body-parser')
const hbs = require('hbs')
const Qs = require('qs')
const fetch = require('node-fetch')
const window = require('node-window')
const location = require('node-location')
const PORT = 3000 || process.env.PORT

// https://www.googleapis.com/youtube/v3/search?part=snippet&key=&type=video&q=ajax&maxResults=50


let query = "news"
let key = "AIzaSyC5Y2wKpR34IxoU8MrtT9cxhHCNL_2OjzM"
key = "AIzaSyB_V-a8U3z4_RwAggUlghvGEAGyzOJe0iI"
key = "AIzaSyDcr9HdKfLl0mmLeQXO92QrbyQOKC5qjRI"

// let create array of random no
let videoArray = ["javascript", "java", "c++", "c", "python", "comedy", "news", "cricket", "song", "cid", "mjo", "window", "game", "sponge", "tennis ", "motu patlu", "chhota bheem", "dablu bablu"]

let len = videoArray.length
// url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC5Y2wKpR34IxoU8MrtT9cxhHCNL_2OjzM&type=playlist&q=ajax&maxResults=100"
// fetch data from fetch request

let maxResults = 50
const fetchApi = async (query, nextPageToken) => {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&type=video&q=${query}&maxResults=${maxResults}`
    let res = await fetch(url)
    return res.json()
}


// add middleware 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'assets')))

// set hbs engine
app.set("view engine", "hbs")

// set hbs path
const templateview = path.join(__dirname, "templates/views");
app.set("views", templateview);

// set partials path
const partialsPath = path.join(__dirname, "templates/partials");
hbs.registerPartials(partialsPath);

// app routes
app.get('/', async (req, res) => {
    try {
        let id = req.params.video
        let randName = Math.floor(len * (Math.random()) + 1)
        console.log(videoArray[randName])
        let file = await fetchApi(videoArray[randName])

        let item = file["items"]
        // item.map((elem) => {

        //     console.log(elem)
        // })
        res.render("index", {
            data: item
        })
    } catch (error) {
        res.status(404).render("error")
    }
})

app.get('/watch', async (req, res) => {
    try {
        let query = (req.query.search)
        let file = await fetchApi(query)
        let item = file["items"]

        res.render("index", {
            data: item
        })

    } catch (error) {
        res.status(404).render("error")
    }
})

app.get('/:video', async (req, res) => {
    try {
        let id = req.params.video
        let randName = Math.floor(len * (Math.random()) + 1)
        let file = await fetchApi(videoArray[randName])
        let item = file["items"]
        res.render("video", {
            data: item,
            id: id
        })
    } catch (error) {
        res.status(404).send(error)
    }
})

app.get("/playlist/video", async (req, res) => {
    try {
        res.status(200).render("playlist")
    } catch (error) {
        res.status(404).send(error)
    }
})
// https://www.googleapis.com/youtube/v3/search
// AIzaSyDYiiaVy0Fid - rDeh0rE3QggD3JCRf6trI

// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDYiiaVy0Fid-rDeh0rE3QggD3JCRf6trI&type=video&q=ajax&maxResults=100

// app listening
app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})