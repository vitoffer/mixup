import { Router, default as express } from "express"
import {
	addTrack,
	addTrackByPlatforms,
	getTrackById,
	getTrackImageByFileName,
	getTrackList,
} from "../controllers/controller.js"
import fileUpload from "express-fileupload"
import {
	findTrackOnSpotify,
	findTrackOnVK,
	findTrackOnYandex,
	findTrackOnYoutube,
} from "../controllers/findTrack.js"

export const router = Router()

router.use(express.json())
router.use(fileUpload())

router.get("/api/tracks", getTrackList)
router.get("/api/tracks/:id", getTrackById)
router.get("/api/images/:fileName", getTrackImageByFileName)

router.post("/api/add-track", addTrack)
router.post("/api/add-track/by-platforms", addTrackByPlatforms)

router.post("/api/find-track-on-youtube", findTrackOnYoutube)
router.post("/api/find-track-on-spotify", findTrackOnSpotify)
router.post("/api/find-track-on-vk", findTrackOnVK)
router.post("/api/find-track-on-yandex", findTrackOnYandex)
