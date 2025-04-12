import env from "@/env"
import { bearerAuth } from "hono/bearer-auth"
import { verify } from "hono/jwt"
import { JWTPayload } from "hono/utils/jwt/types"

export type Role = "user" | "moderator" | "admin"
export interface UserJWTPayload extends JWTPayload {
	exp: number
	username: string
	role: Role
}

export async function verifyToken(token: string) {
	const decodedPayload = (await verify(token, env.JWT_SECRET)) as UserJWTPayload
	return decodedPayload
}

export async function checkUserPermission(
	token: string,
	requiredRoles: Role[]
): Promise<boolean> {
	try {
		const decodedPayload = await verifyToken(token)

		return requiredRoles.includes(decodedPayload.role)
	} catch (e) {
		console.error(e)
		return false
	}
}

function basicAuth(
	verifyFunction: (token: string) => boolean | Promise<boolean>
) {
	return bearerAuth({
		verifyToken: verifyFunction,
		invalidTokenMessage: {
			message: "Invalid token",
		},
		noAuthenticationHeaderMessage: { message: "No auth header" },
		invalidAuthenticationHeaderMessage: { message: "Invalid Auth header" },
	})
}

export const generalAuth = basicAuth(async (token) => {
	try {
		await verifyToken(token)
		return true
	} catch (e) {
		console.error(e)
		return false
	}
})

function authByRoles(roles: Role[]) {
	return basicAuth((token) => checkUserPermission(token, roles))
}

function basicAdminAuth(additionalRoles?: Role[]) {
	return authByRoles(["admin", ...(additionalRoles || [])])
}

export const adminAuth = basicAdminAuth()
export const moderatorAuth = basicAdminAuth(["moderator"])
