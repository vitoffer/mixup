import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import {
	jsonContent,
	jsonContentOneOf,
	jsonContentRequired,
} from "stoker/openapi/helpers"
import {
	createErrorSchema,
	createMessageObjectSchema,
} from "stoker/openapi/schemas"
import { NotFoundSchema } from "../../lib/constants"
import {
	InsertTrackSchema,
	NormalizedPopulatedTrackSchema,
	PatchTrackSchema,
} from "../../models/Track"
import { ParamsIdSchema } from "../../schemas/tracks"
import { moderatorAuth } from "@/middlewares/auth"

const tags = ["Tracks"]

export const list = createRoute({
	path: "/tracks",
	method: "get",
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(NormalizedPopulatedTrackSchema),
			"List of tracks"
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			z.object({ message: z.string() }),
			"Error on get results"
		),
	},
	tags,
})

export const getOne = createRoute({
	path: "/tracks/{id}",
	method: "get",
	request: {
		params: ParamsIdSchema,
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			NormalizedPopulatedTrackSchema,
			"Found track"
		),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(ParamsIdSchema),
			"Incorrect track Id"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Track not found"),
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
			NormalizedPopulatedTrackSchema,
			"Created track"
		),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(InsertTrackSchema),
			"Validation error(s)"
		),
		[HttpStatusCodes.BAD_REQUEST]: jsonContent(
			createMessageObjectSchema("Invalid request"),
			"Error in request"
		),
	},
	tags,
	middleware: moderatorAuth,
})

export const patch = createRoute({
	path: "/tracks/{id}",
	method: "patch",
	request: {
		params: ParamsIdSchema,
		body: jsonContentRequired(PatchTrackSchema, "Track to update"),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			NormalizedPopulatedTrackSchema,
			"Updated track"
		),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
			[createErrorSchema(PatchTrackSchema), createErrorSchema(ParamsIdSchema)],
			"Validation error(s)"
		),
		[HttpStatusCodes.BAD_REQUEST]: jsonContent(
			createMessageObjectSchema("Invalid request"),
			"Error in request"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Track not found"),
	},
	tags,
	middleware: moderatorAuth,
})

export const remove = createRoute({
	path: "/tracks/{id}",
	method: "delete",
	request: {
		params: ParamsIdSchema,
	},
	responses: {
		[HttpStatusCodes.NO_CONTENT]: {
			description: "Track deleted",
		},
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(ParamsIdSchema),
			"Incorrect track Id"
		),
		[HttpStatusCodes.BAD_REQUEST]: jsonContent(
			createMessageObjectSchema("Invalid request"),
			"Error in request"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Track not found"),
	},
	tags,
	middleware: moderatorAuth,
})

export type ListRoute = typeof list
export type GetOneRoute = typeof getOne
export type CreateRoute = typeof create
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
