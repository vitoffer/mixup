import { Track } from "../models/track.js"
import path from "path"
import mongoose from "mongoose"
import { ABSOLUTE_UPLOADS_FOLDER_PATH } from "../constants.js"
import { promises as fs } from "fs"

function handleError(res, error) {
	console.error(error.message)
	res.status(500).json({ error })
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

export async function getTrackImageByFileName(req, res) {
	try {
		const imagePath = path.join(
			ABSOLUTE_UPLOADS_FOLDER_PATH,
			"images",
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

		let uploadImagePath, imageFile
		if (!req.files) {
			uploadImagePath = path.join(
				ABSOLUTE_UPLOADS_FOLDER_PATH,
				"images",
				"image_not_loaded.png"
			)
		} else {
			imageFile = req.files.image
			uploadImagePath = path.join(
				ABSOLUTE_UPLOADS_FOLDER_PATH,
				"images",
				imageFile.name
			)
		}

		const track = new Track({ ...body, imageUrl: uploadImagePath })
		await track.save()

		if (imageFile) {
			imageFile.mv(uploadImagePath)
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

export async function addTrackByPlatforms(req, res) {
	try {
		const { youtube, spotify, yandex, vkLink, mixedTrackIds } = req.body

		const name = spotify.name || yandex.name || youtube.name
		const authors = spotify.authors || yandex.authors || youtube.authors
		const mixedTracks = mixedTrackIds.map((id) =>
			mongoose.Types.ObjectId.createFromHexString(id)
		)

		const platformLinks = {
			youtube: youtube?.link || "",
			spotify: spotify?.link || "",
			vk: vkLink || "",
			yandex: yandex?.link || "",
		}

		const track = new Track({
			name,
			authors,
			mixedTracks,
			platformLinks,
		})

		const downloadImage = async (url, destFolder) => {
			const response = await fetch(url)
			const blob = await response.blob()
			const arrayBuffer = await blob.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)
			const imageName = track._id + "." + blob.type.split("/")[1]
			const fullPath = path.join(destFolder, imageName)
			await fs.writeFile(fullPath, buffer)
			return imageName
		}

		const imageName = await downloadImage(
			spotify.imageUrl || yandex.imageUrl || youtube.imageUrl,
			path.join(ABSOLUTE_UPLOADS_FOLDER_PATH, "images")
		)

		track.imageName = imageName
		await track.save()
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
