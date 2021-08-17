const express = require('express')
const app = express()
const path = require("path")
const bodyParser = require('body-parser')
const hbs = require('hbs')
const Qs = require('qs')
const fetch = require('node-fetch')
const location = require('node-location')
const PORT = 3000 || process.env.PORT

// https://www.googleapis.com/youtube/v3/search?part=snippet&key=&type=video&q=ajax&maxResults=50


let query = "news"
const key = "AIzaSyC5Y2wKpR34IxoU8MrtT9cxhHCNL_2OjzM"

// let create array of random no
let videoArray = ["javascript", "java", "c++", "c", "python", "comedy", "news", "cricket", "song", "cid", "mjo", "window"]

let len = videoArray.length
// url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC5Y2wKpR34IxoU8MrtT9cxhHCNL_2OjzM&type=video&q=ajax&maxResults=100"
// fetch data from fetch request
let data
const fetchApi = async (query) => {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&type=video&q=${query}&maxResults=50`
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

// https://www.googleapis.com/youtube/v3/search
// AIzaSyDYiiaVy0Fid - rDeh0rE3QggD3JCRf6trI

// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDYiiaVy0Fid-rDeh0rE3QggD3JCRf6trI&type=video&q=ajax&maxResults=100

// app listening
app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})