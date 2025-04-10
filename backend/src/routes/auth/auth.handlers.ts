import { AppRouteHandler } from "@/lib/types"
import { LoginRoute } from "./auth.routes"
import { sign } from "hono/jwt"
import env from "@/env"

export const login: AppRouteHandler<LoginRoute> = async (c) => {
	const defaultCreds = {
		username: "admin",
		password: "admin",
	}

	const user = c.req.valid("json")

	if (
		user.username !== defaultCreds.username ||
		user.password !== defaultCreds.password
	) {
		return c.json({ message: "Wrong username or password" }, 401)
	}

	const payload = {
		username: user.username,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
	}

	const token = await sign(payload, env.JWT_SECRET)

	return c.json(
		{
			message: "Success login",
			data: payload,
			token,
		},
		200
	)
}
