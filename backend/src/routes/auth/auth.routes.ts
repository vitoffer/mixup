import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"

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
		[HttpStatusCodes.UNAUTHORIZED]: jsonContent(
			z.object({
				message: z.string(),
			}),
			"Error on login"
		),
	},
	tags,
})

export type LoginRoute = typeof login
