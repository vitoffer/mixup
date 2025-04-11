import { NotFoundSchema } from "@/lib/constants"
import { adminAuth } from "@/middlewares/auth"
import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"
import { createMessageObjectSchema } from "stoker/openapi/schemas"

const tags = ["Auth"]

export const login = createRoute({
	path: "/login",
	method: "post",
	request: {
		body: jsonContentRequired(
			z.object({ username: z.string().min(1), password: z.string().min(1) }),
			"Credentials for login"
		),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.object({
				message: z.string(),
				data: z.object({
					username: z.string(),
					exp: z.number(),
				}),
				token: z.string(),
			}),
			"Success login"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "User not found"),
		[HttpStatusCodes.UNAUTHORIZED]: jsonContent(
			createMessageObjectSchema("Unauthorized error"),
			"Error on login"
		),
	},
	tags,
})

export const registerModerator = createRoute({
	path: "/reg-moder",
	method: "post",
	request: {
		body: jsonContentRequired(
			z.object({ username: z.string().min(1), password: z.string().min(1) }),
			"Credentials for register"
		),
	},
	responses: {
		[HttpStatusCodes.CREATED]: jsonContent(
			createMessageObjectSchema("User created"),
			"Success register"
		),
		[HttpStatusCodes.CONFLICT]: jsonContent(
			createMessageObjectSchema("Conflict in database"),
			"Conflict error"
		),
	},
	tags,
	middleware: adminAuth,
})

export type LoginRoute = typeof login
export type RegisterModeratorRoute = typeof registerModerator
