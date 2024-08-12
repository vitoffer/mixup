import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import { connectToDb } from "./db/db.js"
import { router } from "./routes/router.js"

dotenv.config()

const VUE_APP_URL = process.env.VUE_APP_URL
const MONGO_DB_URI = process.env.MONGO_DB_URI
const PORT = process.env.PORT

const app = express()

app.use(
	cors({
		origin: VUE_APP_URL,
	})
)
app.use(router)

async function start() {
	try {
		await connectToDb(MONGO_DB_URI)

		app.listen(PORT, () => console.log("App is running on port:", PORT))
	} catch (err) {
		console.error(err)
	}
}

start()
