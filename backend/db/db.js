import { connect } from "mongoose"

export async function connectToDb(uri) {
	try {
		await connect(uri, {
			serverSelectionTimeoutMS: 5000,
		})

		console.log("Connected to MongoDB")
	} catch (err) {
		console.error(`DB connection error`)

		throw err
	}
}
