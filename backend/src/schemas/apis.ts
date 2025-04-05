import { z } from "zod"

export const CleanedApiSearchResultSchema = z.object({
	title: z.string(),
	url: z.string(),
	artistsNames: z.array(z.string()),
	thumbnailUrl: z.string(),
})

export type CleanedApiSearchResultType = z.infer<
	typeof CleanedApiSearchResultSchema
>
