import { BASIC_AUTH_ROUTE } from "@/constants"
import { useUserStore } from "@/stores/userStore"
import axios from "axios"

export async function registerModerator(username: string, password: string) {
	const userStore = useUserStore()

	try {
		const { data } = await axios.post(
			`${BASIC_AUTH_ROUTE}/reg-moder`,
			{
				username,
				password,
			},
			{
				headers: {
					Authorization: `Bearer ${userStore.token}`,
				},
			},
		)

		return true
	} catch (e) {
		return false
	}
}
