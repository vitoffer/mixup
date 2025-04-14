import { useUserStore } from "@/stores/userStore"
import axios, { AxiosError } from "axios"
import { BASIC_AUTH_ROUTE } from "../constants"
import { Role, UserJWTPayload } from "@/types"

export async function login(
	username: string,
	password: string,
): Promise<boolean> {
	const userStore = useUserStore()

	try {
		const { data } = await axios.post(`${BASIC_AUTH_ROUTE}/login`, {
			username,
			password,
		})

		userStore.token = data.token
		return true
	} catch (e) {
		console.error(e)
		return false
	}
}

export async function getMe(): Promise<
	| {
			success: true
			status: number
			data: UserJWTPayload
	  }
	| {
			success: false
			status: number
			error: AxiosError
	  }
> {
	const userStore = useUserStore()

	try {
		const { data, status } = await axios.get(`${BASIC_AUTH_ROUTE}/me`, {
			headers: {
				Authorization: `Bearer ${userStore.token}`,
			},
		})
		return { success: true, status, data: data.data }
	} catch (e) {
		const axiosErr = e as AxiosError
		console.log(axiosErr)
		return { success: false, status: axiosErr.status || 400, error: axiosErr }
	}
}

export async function apiCheckRole(requiredRoles: Role[]) {
	const fetchedUserData = await getMe()
	if (!fetchedUserData.success) {
		return false
	}
	return requiredRoles.includes(fetchedUserData.data.role)
}
