import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import { connectToDb } from "./db/db.js"
import { router } from "./routes/router.js"
import path from "path"

dotenv.config()

const PORT = process.env.PORT
const VUE_APP_URL = process.env.VUE_APP_URL
const MONGO_DB_URI = process.env.MONGO_DB_URI
const MONGO_DB_USER = process.env.MONGO_DB_USER
const MONGO_DB_PASS = process.env.MONGO_DB_PASS

export const ABSOLUTE_UPLOADS_FOLDER_PATH = path.resolve(
	import.meta.dirname,
	process.env.UPLOADS_FOLDER
)

console.log(ABSOLUTE_UPLOADS_FOLDER_PATH)

const app = express()

app.use(
	cors({
		origin: VUE_APP_URL,
	})
)
app.use(router)

async function start() {
	try {
		await connectToDb(MONGO_DB_URI, MONGO_DB_USER, MONGO_DB_PASS)

		app.listen(PORT, () => console.log("App is running on port:", PORT))
	} catch (err) {
		console.error(err)
	}
}

start()
