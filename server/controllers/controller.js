import { Track } from "../models/Track.js"
import path from "path"

export async function getTrackList(req, res) {
	const tracks = await Track.find()
	res.send(tracks)
}

export async function addTrack(req, res) {
	const body = req.body
	const file = req.files.image
	const uploadPath = `uploads/images/${file.name}`

	console.log(body)

	try {
		const track = new Track({ ...body, imageUrl: uploadPath })
		await track.save()

		file.mv(uploadPath)
		res.status(200).send("Track successfully added by id: " + track._id)
	} catch (err) {
		console.log(err.message)
	}
}

export async function getTrackByName(req, res) {
	const name = req.params.name

	try {
		const track = await Track.findOne({ name: name })

		res.status(200).send(track)
	} catch (err) {
		console.log(err.message)
	}
}

export async function getTrackImageByLink(req, res) {
	const imagePath = path.join(import.meta.dirname, "../", req.params.link)

	res.sendFile(imagePath)
}
