import env from "@/env"
import mongoose from "mongoose"

export default async function dbConnect() {
	try {
		const connectURI = `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}?authSource=admin`

		await mongoose.connect(connectURI)
		console.log("MongoDB Connected Successfully")
	} catch (e) {
		console.error(e)
	}
}
