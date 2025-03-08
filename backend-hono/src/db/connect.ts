import mongoose from "mongoose"

export default async function dbConnect() {
	try {
		const connectURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
		console.log(connectURI)
		await mongoose.connect(connectURI)
		console.log("MongoDB Connected Successfully")
	} catch (e) {
		console.error(e)
	}
}
