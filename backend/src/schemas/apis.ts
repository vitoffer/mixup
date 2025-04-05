import { z } from "zod"

export const cleanedApiSearchResultSchema = z.object({
	title: z.string(),
	url: z.string(),
	artistsNames: z.array(z.string()),
	thumbnailUrl: z.string(),
})

export type cleanedApiSearchResultType = z.infer<
	typeof cleanedApiSearchResultSchema
>
