import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import {
	jsonContent,
	jsonContentOneOf,
	jsonContentRequired,
} from "stoker/openapi/helpers"
import {
	insertTracksSchema,
	patchTracksSchema,
	selectTracksSchema,
} from "../../models/Track"
import { createErrorSchema } from "stoker/openapi/schemas"
import { notFoundSchema } from "../../lib/constants"
import { paramsIdSchema } from "../../schemas/tracks"

const tags = ["Tracks"]

export const list = createRoute({
	path: "/tracks",
	method: "get",
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(selectTracksSchema),
			"List of tracks"
		),
	},
	tags,
})

export const getOne = createRoute({
	path: "/tracks/{id}",
	method: "get",
	request: {
		params: paramsIdSchema,
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(selectTracksSchema, "Found track"),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Track not found"),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(paramsIdSchema),
			"Incorrect track Id"
		),
	},
	tags,
})

export const create = createRoute({
	path: "/tracks",
	method: "post",
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
	tags,
})

export const patch = createRoute({
	path: "/tracks/{id}",
	method: "patch",
	request: {
		params: paramsIdSchema,
		body: jsonContentRequired(patchTracksSchema, "Track to update"),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(selectTracksSchema, "Updated track"),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
			[createErrorSchema(patchTracksSchema), createErrorSchema(paramsIdSchema)],
			"Validation error(s)"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Track not found"),
	},
	tags,
})

export type ListRoute = typeof list
export type GetOneRoute = typeof getOne
export type CreateRoute = typeof create
export type PatchRoute = typeof patch
