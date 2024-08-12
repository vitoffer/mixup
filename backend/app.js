import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import { connectToDb } from "./db/db.js"
import { router } from "./routes/router.js"

dotenv.config({ path: "../.env" })

const app = express()

app.use(
	cors({
		origin: "http://localhost:5173",
	})
)
app.use(router)

async function start() {
	try {
		await connectToDb("mongodb://127.0.0.1:27017/mixup")

		app.listen(3000, () => console.log("App is running on port:", 3000))
	} catch (err) {
		console.error(err)
	}
}

start()
