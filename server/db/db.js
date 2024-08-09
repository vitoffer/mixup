import mongoose from "mongoose"

export async function connectToDb(url, port, db) {
	try {
		const connection = await mongoose.connect(`mongodb://${url}:${port}/${db}`)
		console.log("connected to MongoDB")
		return connection
	} catch (err) {
		console.log(`DB connection error: ${err}`)
	}
}
