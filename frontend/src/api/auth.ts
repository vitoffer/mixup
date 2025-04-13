import { useUserStore } from "@/stores/user"
import axios, { AxiosError } from "axios"
import { BASIC_AUTH_ROUTE } from "./constants"

interface UserJWTPayload {
	username: string
	role: string
	exp: number
}

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
		if (e instanceof AxiosError) {
			if (e.status === 404) {
			}
			if (e.status === 401) {
			}
		}
		console.error(e)
		return false
	}
}

export async function getMe(): Promise<
	{
		success: boolean
		status: number
	} & (
		| { data: UserJWTPayload }
		| {
				error: AxiosError
		  }
	)
> {
	try {
		const { data, status } = await axios.get(`${BASIC_AUTH_ROUTE}/me`)
		return { success: true, status, data }
	} catch (e) {
		const axiosErr = e as AxiosError
		console.log(axiosErr)
		return { success: false, status: axiosErr.status!, error: axiosErr }
	}
}
