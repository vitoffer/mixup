import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"
import { insertTracksSchema, selectTracksSchema } from "../../models/Track"
import {
	createErrorSchema,
	createMessageObjectSchema,
} from "stoker/openapi/schemas"
import { notFoundSchema } from "../../lib/constants"

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

export const getOne = createRoute({
	tags,
	method: "get",
	path: "/tracks/{id}",
	request: {
		params: z.object({
			id: z.string(),
		}),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(selectTracksSchema, "Found track"),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Track not found"),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createMessageObjectSchema("Incorrect Id"),
			"Incorrect track Id"
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
export type GetOneRoute = typeof getOne
export type CreateRoute = typeof create
