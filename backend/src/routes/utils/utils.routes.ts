import { createRoute, z } from "@hono/zod-openapi"
import { jsonContent } from "stoker/openapi/helpers"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { createMessageObjectSchema } from "stoker/openapi/schemas"

const tags = ["Utils"]

export const ping = createRoute({
	path: "/ping",
	method: "get",
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			createMessageObjectSchema("Success response"),
			"Pong response"
		),
	},
	tags,
})

export type PingRoute = typeof ping
