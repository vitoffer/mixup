import { z } from "zod"

export const CleanedYoutubeVideoSearchResult = z.object({
	name: z.string(),
	url: z.string(),
	artist: z.string(),
})
