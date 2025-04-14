import { z } from "zod"

const EnvSchema = z
	.object({
		NODE_ENV: z.string().default("development"),
		BACKEND_PORT: z.coerce.number().optional(),
		LOG_LEVEL: z
			.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
			.default("info"),
		VITE_BASE_API_URL: z.string().url(),
		PROXY_USERNAME: z.string().transform(encodeURIComponent),
		PROXY_PASSWORD: z.string().transform(encodeURIComponent),
		PROXY_HOST: z.string().ip(),
		PROXY_PORT: z.coerce.number(),
		SPOTIFY_CLIENT_ID: z.string().length(32),
		SPOTIFY_CLIENT_SECRET: z.string().length(32),
		DB_USER: z.string().transform(encodeURIComponent),
		DB_PASSWORD: z.string().transform(encodeURIComponent),
		DB_HOST: z.string(),
		DB_PORT: z.coerce.number(),
		DB_NAME: z.string(),
		JWT_SECRET: z.string().length(64),
	})
	.superRefine((input, ctx) => {
		if (input.NODE_ENV === "production" && !input.BACKEND_PORT) {
			ctx.addIssue({
				code: z.ZodIssueCode.invalid_type,
				expected: "number",
				received: "undefined",
				path: ["BACKEND_PORT"],
				message: "Must be set when NODE_ENV is 'production'",
			})
		}
	})
	.transform((input) => {
		if (input.NODE_ENV !== "production" && !input.BACKEND_PORT) {
			input.BACKEND_PORT = 4000
		}
		return input
	})

export type env = z.infer<typeof EnvSchema>

const { data: env, error } = EnvSchema.safeParse(process.env)

if (error) {
	console.error("❌ Invalid env:")
	console.error(JSON.stringify(error.flatten().fieldErrors, null, 2))
	process.exit(1)
}

export default env!
