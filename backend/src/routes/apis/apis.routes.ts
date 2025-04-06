import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers"
import { PlatformSchema } from "../../types"
import { CleanedApiSearchResultSchema } from "../../schemas/apis"

const tags = ["APIs"]

export const searchTracks = createRoute({
	path: "/search/:platform",
	method: "get",
	request: {
		params: z.object({
			platform: PlatformSchema,
		}),
		query: z.object({
			q: z.string().min(1),
		}),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(CleanedApiSearchResultSchema),
			"Search results"
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			z.object({ message: z.string() }),
			"Error on get results"
		),
	},
	tags,
})

export type SearchTracksRoute = typeof searchTracks
