import { connect } from "mongoose"

export async function connectToDb(url, port, db) {
	try {
		await connect(`mongodb://${url}:${port}/${db}`, {
			serverSelectionTimeoutMS: 5000,
		})

		console.log("Connected to MongoDB")
	} catch (err) {
		console.error(`DB connection error`)

		throw err
	}
}
