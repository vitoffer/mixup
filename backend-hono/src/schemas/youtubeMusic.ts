import { z } from "zod"

export const CleanedYoutubeVideoSearchResult = z.object({
	title: z.string(),
	url: z.string(),
	artist: z.string(),
})
