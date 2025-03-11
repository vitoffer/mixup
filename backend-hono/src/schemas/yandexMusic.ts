import { z } from "zod"

export const CleanedYandexMusicSearchResult = z.object({
	title: z.string(),
	url: z.string(),
	artists: z.array(z.string()),
})
