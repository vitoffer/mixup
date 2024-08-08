import { Router } from "express"
import { Track } from "../models/Track.js"

export const router = Router()

router.get("/api/tracks", async (req, res) => {
	const tracks = await Track.find()
	res.send(tracks)
})
