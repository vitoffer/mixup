import { Track } from "../models/Track.js"
import path from "path"
import mongoose from "mongoose"
import { log } from "console"

function handleError(res, error) {
	console.error(error.message)
	res.status(500).json({ error })
}

export async function getTrackList(req, res) {
	try {
		const tracks = await Track.find().populate("mixedTracks")

		res.status(200).send(tracks)
	} catch (err) {
		handleError(res, err)
	}
}

export async function getTrackByName(req, res) {
	try {
		const name = req.params.name

		const track = await Track.findOne({ name: name })

		res.status(200).send(track)
	} catch (err) {
		handleError(res, err)
	}
}

export async function getTrackById(req, res) {
	try {
		const id = req.params.id

		const track = await Track.findOne({ _id: id }).populate("mixedTracks")

		res.status(200).send(track)
	} catch (err) {
		handleError(res, err)
	}
}

export async function getTrackImageByFileName(req, res) {
	try {
		const imagePath = path.join(
			import.meta.dirname,
			"../uploads/images",
			req.params.fileName
		)

		res.sendFile(imagePath)
	} catch (err) {
		handleError(res, err)
	}
}

export async function addTrack(req, res) {
	try {
		const body = req.body

		if (Object.keys(body).length === 0) {
			throw new TypeError("Request body is empty")
		}

		let uploadPath, file
		if (!req.files) {
			uploadPath = "uploads/images/image_not_loaded.png"
		} else {
			file = req.files.image
			uploadPath = `uploads/images/${file.name}`
		}

		const track = new Track({ ...body, imageUrl: uploadPath })
		await track.save()

		if (file) {
			file.mv(uploadPath)
		}

		res.status(200).send(`Track with id '${track._id}' successfully added`)
	} catch (err) {
		if (err instanceof mongoose.Error) {
			handleError(res, err)
		} else {
			console.error(err.message)
			res.status(500).json({
				error: { name: err.name, message: err.message },
			})
		}
	}
}
