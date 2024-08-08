import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import { connectToDb } from "./db/db.js"
import { router } from "./router/router.js"

dotenv.config()

const mongoUrl = process.env.MONGO_URL
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === "dev") {
	app.use(
		cors({
			origin: "*",
			credentials: true,
		})
	)
} else if (process.env.NODE_ENV === "prod") {
	app.use(
		cors({
			origin: "http://mixup.space",
			credentials: true,
		})
	)
}

app.use(router)

connectToDb(mongoUrl)

app.listen(port, () => console.log("app is running on port:", port))
