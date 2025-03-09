import mongoose from "mongoose"
import { z } from "zod"

const objectIdSchema = z
	.string()
	.refine((value) => mongoose.Types.ObjectId.isValid(value), {
		message: "Invalid ObjectId",
	})

export const routeParamsIdSchema = z.object({ id: objectIdSchema })
