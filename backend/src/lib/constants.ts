import * as HttpStatusPhrases from "stoker/http-status-phrases"
import { createMessageObjectSchema } from "stoker/openapi/schemas"

export const NotFoundSchema = createMessageObjectSchema(
	HttpStatusPhrases.NOT_FOUND
)
