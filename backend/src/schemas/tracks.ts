import mongoose from "mongoose"
import { z } from "zod"

const ObjectIdSchema = z
	.string()
	.refine((value) => mongoose.Types.ObjectId.isValid(value), {
		message: "Invalid ObjectId",
	})

export const ParamsIdSchema = z.object({ id: ObjectIdSchema })
