import mongoose from "mongoose"

export default async function dbConnect() {
	try {
		const encodedUser = encodeURIComponent(process.env.DB_USER!)
		const encodedPass = encodeURIComponent(process.env.DB_PASSWORD!)
		const connectURI = `mongodb://${encodedUser}:${encodedPass}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`

		await mongoose.connect(connectURI)
		console.log("MongoDB Connected Successfully")
	} catch (e) {
		console.error(e)
	}
}
