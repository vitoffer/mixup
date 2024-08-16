import cors from "cors"
import express from "express"
import { connectToDb } from "./db/db.js"
import { router } from "./routes/router.js"
import {
	PORT,
	VUE_APP_URL,
	MONGO_DB_URI,
	MONGO_DB_USER,
	MONGO_DB_PASS,
} from "./constants.js"

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
