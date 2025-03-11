import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import {
	jsonContent,
	jsonContentOneOf,
	jsonContentRequired,
} from "stoker/openapi/helpers"
import { createErrorSchema } from "stoker/openapi/schemas"
import { notFoundSchema } from "../../lib/constants"
import {
	InsertTrackSchema,
	PatchTrackSchema,
	TrackSchemaPopulated,
} from "../../models/Track"
import { paramsIdSchema } from "../../schemas/tracks"

const tags = ["Tracks"]

export const list = createRoute({
	path: "/tracks",
	method: "get",
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(TrackSchemaPopulated),
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
		[HttpStatusCodes.OK]: jsonContent(TrackSchemaPopulated, "Found track"),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(paramsIdSchema),
			"Incorrect track Id"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Track not found"),
	},
	tags,
})

export const create = createRoute({
	path: "/tracks",
	method: "post",
	request: {
		body: jsonContentRequired(InsertTrackSchema, "Track to create"),
	},
	responses: {
		[HttpStatusCodes.CREATED]: jsonContent(
			TrackSchemaPopulated,
			"Created track"
		),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(InsertTrackSchema),
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
		body: jsonContentRequired(PatchTrackSchema, "Track to update"),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(TrackSchemaPopulated, "Updated track"),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
			[createErrorSchema(PatchTrackSchema), createErrorSchema(paramsIdSchema)],
			"Validation error(s)"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Track not found"),
	},
	tags,
})

export const remove = createRoute({
	path: "/tracks/{id}",
	method: "delete",
	request: {
		params: paramsIdSchema,
	},
	responses: {
		[HttpStatusCodes.NO_CONTENT]: {
			description: "Track deleted",
		},
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(paramsIdSchema),
			"Incorrect track Id"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Track not found"),
	},
	tags,
})

export type ListRoute = typeof list
export type GetOneRoute = typeof getOne
export type CreateRoute = typeof create
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
