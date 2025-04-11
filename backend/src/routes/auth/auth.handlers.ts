import { AppRouteHandler } from "@/lib/types"
import { LoginRoute, RegisterModeratorRoute } from "./auth.routes"
import { sign } from "hono/jwt"
import env from "@/env"
import { User } from "@/models/User"
import * as HttpStatusCodes from "stoker/http-status-codes"

export const login: AppRouteHandler<LoginRoute> = async (c) => {
	const { username, password } = c.req.valid("json")

	const dbUser = await User.findOne({ username })

	if (!dbUser) {
		return c.json(
			{ message: "User with this username not found" },
			HttpStatusCodes.NOT_FOUND
		)
	}

	const passwordMatch = await Bun.password.verify(
		password,
		dbUser.passwordHash,
		"bcrypt"
	)

	if (!passwordMatch) {
		return c.json(
			{
				message: "Wrong password",
			},
			HttpStatusCodes.UNAUTHORIZED
		)
	}

	const payload = {
		username: username,
		role: dbUser.role,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
	}

	const token = await sign(payload, env.JWT_SECRET)

	return c.json(
		{
			message: "Success login",
			data: payload,
			token,
		},
		HttpStatusCodes.OK
	)
}

export const registerModerator: AppRouteHandler<
	RegisterModeratorRoute
> = async (c) => {
	const { username, password } = c.req.valid("json")

	const existingUsername = await User.findOne({ username })

	if (existingUsername) {
		return c.json(
			{ message: "User with this username already exists" },
			HttpStatusCodes.CONFLICT
		)
	}

	const passwordHash = await Bun.password.hash(password, {
		algorithm: "bcrypt",
		cost: 4,
	})

	await User.create({
		username,
		passwordHash,
		role: "moderator",
	})

	return c.json(
		{
			message: "Success register",
		},
		HttpStatusCodes.CREATED
	)
}
