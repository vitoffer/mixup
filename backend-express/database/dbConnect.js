import { connect } from "mongoose"

export async function connectToDb(uri, user, pass) {
	try {
		await connect(uri, {
			user,
			pass,
			authSource: "admin",
			serverSelectionTimeoutMS: 5000,
		})

		console.log("Connected to MongoDB")
	} catch (err) {
		console.error(`DB connection error`)

		throw err
	}
}
