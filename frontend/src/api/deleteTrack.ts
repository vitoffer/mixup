import { BASIC_TRACKS_ROUTE } from "@/constants"
import { useUserStore } from "@/stores/userStore"
import axios from "axios"

export async function deleteTrack(trackId: string) {
	const userStore = useUserStore()

	try {
		const { data } = await axios.delete(`${BASIC_TRACKS_ROUTE}/${trackId}`, {
			headers: {
				Authorization: `Bearer ${userStore.token}`,
			},
		})
		return true
	} catch (e) {
		console.error(e)
		return false
	}
}
