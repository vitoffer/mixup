import { Track } from "../models/Track.js"
import path from "path"

export async function getTrackList(req, res) {
	const tracks = await Track.find().populate("mixedTracks")
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

export async function getTrackById(req, res) {
	const id = req.params.id

	try {
		const track = await Track.findOne({ _id: id })

		res.status(200).send(track)
	} catch (err) {
		console.log(err.message)
	}
}

export async function getTrackImageByFileName(req, res) {
	const imagePath = path.join(
		import.meta.dirname,
		"../uploads/images",
		req.params.fileName
	)

	res.sendFile(imagePath)
}
