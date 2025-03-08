import { createRoute, z } from "@hono/zod-openapi"
import { createRouter } from "../lib/createApp"
import Track from "../models/Track"

const router = createRouter()
	.openapi(
		createRoute({
			method: "get",
			path: "/",
			responses: {
				200: {
					content: {
						"application/json": {
							schema: z.object({
								message: z.string(),
							}),
						},
					},
					description: "Mixup API Index",
				},
			},
		}),
		(c) => {
			return c.json({
				message: "Mixup API",
			})
		}
	)
	.openapi(
		createRoute({
			method: "get",
			path: "/tracks",
			responses: {
				200: {
					content: {
						"application/json": {
							schema: z.array(
								z.object({
									_id: z.string(),
									title: z.string(),
									__v: z.number(),
								})
							),
						},
					},
					description: "List of tracks",
				},
			},
		}),
		async (c) => {
			const tracks = await Track.find()

			return c.json(tracks)
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
