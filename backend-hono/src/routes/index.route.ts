import { createRoute, z } from "@hono/zod-openapi"
import { createRouter } from "../lib/createApp"
import { jsonContent } from "stoker/openapi/helpers"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { createMessageObjectSchema } from "stoker/openapi/schemas"

const router = createRouter().openapi(
	createRoute({
		tags: ["Index"],
		method: "get",
		path: "/",
		responses: {
			[HttpStatusCodes.OK]: jsonContent(
				createMessageObjectSchema("Mixup API"),
				"Mixup API Index"
			),
		},
	}),
	(c) => {
		return c.json(
			{
				message: "Mixup API",
			},
			HttpStatusCodes.OK
		)
	}
)

export default router
