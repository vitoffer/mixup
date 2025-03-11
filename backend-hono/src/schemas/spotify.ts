import { z } from "zod"

export const CleanedSpotifySearchResult = z.object({
	title: z.string(),
	url: z.string(),
	artistsNames: z.array(z.string()),
})
