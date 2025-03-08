import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers"

export const list = createRoute({
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
})

export type ListRoute = typeof list
