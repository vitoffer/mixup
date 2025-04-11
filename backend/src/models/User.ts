import { zodSchema, extendZod, zId } from "@zodyac/zod-mongoose"
import { model } from "mongoose"
import { z } from "zod"

extendZod(z)

const roles = ["admin", "moderator", "user"] as const
export type Role = (typeof roles)[number]

export const DefaultUserSchema = z.object({
	username: z.string().unique(),
	passwordHash: z.string(),
	role: z.enum(roles),
})

// Объявление схемы для MongoDB
const MongoUserSchema = zodSchema(DefaultUserSchema, {
	timestamps: true,
})
export const User = model("User", MongoUserSchema)

// Объявление схем для описания объектов в БД
export const DbUserSchema = DefaultUserSchema.merge(
	z.object({
		_id: zId(),
		createdAt: z.date(),
		updatedAt: z.date(),
		__v: z.number(),
	})
)

// Объявление нормализованных схем объектов
export const NormalizedUserSchema = DefaultUserSchema.extend({ id: z.string() })
