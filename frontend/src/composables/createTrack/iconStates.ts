import { Platform } from "@/types"
import { ref } from "vue"
import markIcon from "../../assets/icons/mark.svg?url"

export const useIconStates = () => {
	const iconStates = ref<Record<Platform, string>>({
		youtubeMusic: markIcon,
		spotify: markIcon,
		yandexMusic: markIcon,
	})

	return {
		iconStates,
	}
}
