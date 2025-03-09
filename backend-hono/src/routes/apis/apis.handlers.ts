import { RouteHandler } from "@hono/zod-openapi"
import { SearchSpotifyRoute } from "./apis.routes"
import { getSpotifySearchResults } from "../../apis/spotify"
import * as HttpStatusCodes from "stoker/http-status-codes"

export const searchSpotify: RouteHandler<SearchSpotifyRoute> = async (c) => {
	const { q } = c.req.valid("query")

	const results: { tracks: object } = await getSpotifySearchResults(q)
	return c.json(results, HttpStatusCodes.OK) as any
}
