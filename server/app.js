import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import { connectToDb } from "./db/db.js"
import { router } from "./routes/router.js"

dotenv.config()

const NODE_ENV = process.env.NODE_ENV
const MONGO_URL = process.env.MONGO_URL
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB = process.env.MONGO_DB
const PORT = process.env.PORT || 3000

const app = express()

let origin

if (NODE_ENV === "dev") {
	origin = "http://localhost"
}
if (NODE_ENV === "prod") {
	origin = "http://mixup.space"
}

app.use(
	cors({
		origin: origin || "http://localhost",
	})
)
app.use(router)

async function start() {
	try {
		await connectToDb(MONGO_URL, MONGO_PORT, MONGO_DB)

		app.listen(PORT, () => console.log("App is running on port:", PORT))
	} catch (err) {
		console.error(err)
	}
}

start()
