import { z } from "zod"

export const youtubeVideoSearchResult = z.object({
	videoId: z.string(),
	name: z.string(),
	artist: z.object({
		artistId: z.string().nullable(),
		name: z.string(),
	}),
	duration: z.number().nullable(),
	thumbnails: z.array(
		z.object({
			url: z.string(),
			width: z.number(),
			height: z.number(),
		})
	),
})
