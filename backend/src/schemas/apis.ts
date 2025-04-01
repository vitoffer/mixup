import { z } from "zod"

export const CleanedApiSearchResult = z.object({
	title: z.string(),
	url: z.string(),
	artistsNames: z.array(z.string()),
	thumbnailUrl: z.string(),
})
