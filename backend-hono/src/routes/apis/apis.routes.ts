import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers"

const tags = ["Apis"]

export const searchSpotify = createRoute({
	path: "/search-spotify",
	method: "get",
	request: {
		query: z.object({
			q: z.string(),
		}),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.object({
				tracks: z.object({
					href: z.string(),
					limit: z.number(),
					next: z.string(),
					offset: z.number(),
					total: z.number(),
					items: z.array(
						z.object({
							album: z.object({}),
							artists: z.array(z.object({})),
							href: z.string(),
							name: z.string(),
						})
					),
				}),
			}),
			"Spotify search results"
		),
	},
	tags,
})

export const searchYandexMusic = createRoute({
	path: "/search-yandex-music",
	method: "get",
	request: {
		query: z.object({
			q: z.string(),
		}),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.object({
				page: z.number(),
				perPage: z.number(),
				tracks: z.object({
					total: z.number(),
					perPage: z.number(),
					results: z.array(
						z.object({
							id: z.number(),
							title: z.string(),
							artists: z.array(
								z.object({
									id: z.number(),
									name: z.string(),
									cover: z.object({
										uri: z.string(),
									}),
								})
							),
							albums: z.array(
								z.object({
									id: z.number(),
									title: z.string(),
								})
							),
							coverUri: z.string(),
						})
					),
				}),
			}),
			"Yandex music search results"
		),
	},
	tags,
})

export type SearchSpotifyRoute = typeof searchSpotify
export type SearchYandexMusicRoute = typeof searchYandexMusic
