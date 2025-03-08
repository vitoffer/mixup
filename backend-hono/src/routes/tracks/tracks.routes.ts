import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"
import { insertTracksSchema, selectTracksSchema } from "../../models/Track"
import { createErrorSchema } from "stoker/openapi/schemas"

const tags = ["Tracks"]

export const list = createRoute({
	tags,
	method: "get",
	path: "/tracks",
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(selectTracksSchema),
			"List of tracks"
		),
	},
})

export const create = createRoute({
	tags,
	method: "post",
	path: "/tracks",
	request: {
		body: jsonContentRequired(insertTracksSchema, "Track to create"),
	},
	responses: {
		[HttpStatusCodes.CREATED]: jsonContent(selectTracksSchema, "Created track"),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(insertTracksSchema),
			"Validation error(s)"
		),
	},
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
