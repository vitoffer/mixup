import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers"
import { ZTrackSchema } from "../../models/Track"

export const list = createRoute({
	tags: ["Tracks"],
	method: "get",
	path: "/tracks",
	responses: {
		[HttpStatusCodes.OK]: jsonContent(z.array(ZTrackSchema), "List of tracks"),
	},
})

export type ListRoute = typeof list
