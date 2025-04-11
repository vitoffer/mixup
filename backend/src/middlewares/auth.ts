import env from "@/env"
import { bearerAuth } from "hono/bearer-auth"
import { verify } from "hono/jwt"
import { JWTPayload } from "hono/utils/jwt/types"

export type Role = "user" | "moderator" | "admin"
export interface UserJWTPayload extends JWTPayload {
	role: Role
}

export async function checkUserPermission(
	token: string,
	requiredRoles: Role[]
): Promise<boolean> {
	try {
		const decodedPayload = (await verify(
			token,
			env.JWT_SECRET
		)) as UserJWTPayload

		console.log(decodedPayload)

		return requiredRoles.includes(decodedPayload.role)
	} catch (e) {
		console.error(e)
		return false
	}
}

function basicAuth(roles: Role[]) {
	return bearerAuth({
		verifyToken: (token) => checkUserPermission(token, roles),
		invalidTokenMessage: {
			message: "Invalid token",
		},
		noAuthenticationHeaderMessage: { message: "No auth header" },
		invalidAuthenticationHeaderMessage: { message: "Invalid Auth header" },
	})
}

function basicAdminAuth(additionalRoles?: Role[]) {
	return basicAuth(["admin", ...(additionalRoles || [])])
}

export const adminAuth = basicAdminAuth()
export const moderatorAuth = basicAdminAuth(["moderator"])
