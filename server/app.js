const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const Track = require("./models/track")

require("dotenv").config()

const app = express()

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)
app.use(cors())

const mongoUrl = process.env.MONGO_URL
const port = process.env.PORT

mongoose
	.connect(mongoUrl)
	.then((res) => console.log("connected to MongoDB"))
	.catch((err) => console.log(`DB connection error: ${err}`))

app.listen(port, () => console.log("app is running on port:", port))

app.get("/tracks", (req, res) => {
	Track.find()
		.then((tracks) => {
			res.status(200).json(tracks)
		})
		.catch((error) => {
			handleError(res, error)
		})
})

app.post("/add-track", (req, res) => {
	let data = req.body

	data = {
		_id: new mongoose.Types.ObjectId(),
		imageUrl: "imageUrl1",
		title: data.title,
		author: data.author,
		tracksInside: [data.track1, data.track2],
		platforms: [
			{ platform: "youtube", link: data.youtube },
			{ platform: "yandex", link: data.yandex },
			{ platform: "vk", link: data.vk },
		],
	}

	const track = new Track(data)

	track
		.save()
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((err) => handleError(res, err))
})

const handleError = (res, error) => {
	res.status(500).json({ error })
}
