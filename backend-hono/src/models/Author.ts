import { model, Schema } from "mongoose"
import { z } from "zod"

export const ZodAuthorSchema = z.object({
	_id: z.string(),
	__v: z.number(),
	username: z.string(),
})

const authorSchema = new Schema<z.infer<typeof ZodAuthorSchema>>({
	username: { type: String, required: true },
})

const Author = model("Author", authorSchema)

export default Author

export const selectAuthorsSchema = ZodAuthorSchema
export const insertAuthorsSchema = ZodAuthorSchema.omit({
	__v: true,
	_id: true,
})
