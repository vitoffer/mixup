import dotenv from "dotenv"
import path from "path"

dotenv.config()

export const PORT = process.env.PORT

export const VUE_APP_URL = process.env.VUE_APP_URL

export const MONGO_DB_URI = process.env.MONGO_DB_URI
export const MONGO_DB_USER = process.env.MONGO_DB_USER
export const MONGO_DB_PASS = process.env.MONGO_DB_PASS

export const ABSOLUTE_UPLOADS_FOLDER_PATH = path.resolve(
	import.meta.dirname,
	process.env.UPLOADS_FOLDER
)

export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

export const SPOTIFY_ID = process.env.SPOTIFY_ID
export const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET

export const YANDEX_TOKEN = process.env.YANDEX_TOKEN
export const YANDEX_UID = process.env.YANDEX_UID
