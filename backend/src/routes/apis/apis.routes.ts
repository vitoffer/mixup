import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers"
import { CleanedApiSearchResult } from "../../schemas/apis"

const tags = ["Apis"]

export const searchTracks = createRoute({
	path: "/search/:provider",
	method: "get",
	request: {
		params: z.object({
			provider: z.enum(["spotify", "yandex", "youtube"]),
		}),
		query: z.object({
			q: z.string().min(1),
		}),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(CleanedApiSearchResult),
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
