import mongoose from "mongoose"

export async function connectToDb(mongoUrl) {
	try {
		await mongoose.connect(mongoUrl)
		console.log("connected to MongoDB")
	} catch (err) {
		console.log(`DB connection error: ${err}`)
	}
}
