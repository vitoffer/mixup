import { Router, default as express } from "express"
import {
	addTrack,
	getTrackById,
	getTrackByName,
	getTrackImageByFileName,
	getTrackList,
} from "../controllers/controller.js"
import fileUpload from "express-fileupload"

export const router = Router()

router.use(express.json())
router.use(fileUpload())

router.get("/api/tracks", getTrackList)

router.get("/api/tracks/:id", getTrackById)

router.post("/api/add-track", addTrack)

router.get("/api/tracks/:name", getTrackByName)

router.get("/api/images/:fileName", getTrackImageByFileName)
