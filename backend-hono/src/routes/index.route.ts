import { createRoute, z } from "@hono/zod-openapi"
import { createRouter } from "../lib/createApp"
import Track from "../models/Track"
import { jsonContent } from "stoker/openapi/helpers"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { createMessageObjectSchema } from "stoker/openapi/schemas"

const router = createRouter()
	.openapi(
		createRoute({
			tags: ["Index"],
			method: "get",
			path: "/",
			responses: {
				[HttpStatusCodes.OK]: jsonContent(
					createMessageObjectSchema("Mixup API"),
					"Mixup API Index"
				),
			},
		}),
		(c) => {
			return c.json(
				{
					message: "Mixup API",
				},
				HttpStatusCodes.OK
			)
		}
	)
	.openapi(
		createRoute({
			tags: ["Tracks"],
			method: "get",
			path: "/tracks",
			responses: {
				[HttpStatusCodes.OK]: jsonContent(
					z.array(
						z.object({
							_id: z.string(),
							title: z.string(),
							__v: z.number(),
						})
					),
					"List of tracks"
				),
			},
		}),
		async (c) => {
			const tracks = await Track.find()

			return c.json(tracks, HttpStatusCodes.OK)
		}
	)

// app.get("/", (c) => {
// 	return c.text("Hello Hono!")
// })

// app.get("/ping", (c) => {
// 	return c.text("pong!")
// })

// app.get("/tracks", async (c) => {
// 	const tracks = await Track.find()

// 	return c.json(tracks)
// })

// app.post("/tracks", async (c) => {
// 	const data = await c.req.json()

// 	if (!data.title) return c.text("error")

// 	const track = await Track.create(data)

// 	return c.json(track)
// })

export default router
