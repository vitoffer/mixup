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

if (NODE_ENV === "dev") {
	app.use(
		cors({
			origin: "*",
		})
	)
}
if (NODE_ENV === "prod") {
	app.use(
		cors({
			origin: "http://mixup.space",
		})
	)
}

app.use(router)

async function start() {
	await connectToDb(MONGO_URL, MONGO_PORT, MONGO_DB)

	app.listen(PORT, () => console.log("app is running on port:", PORT))
}

start()
