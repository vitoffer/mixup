import { ref, toValue, watch } from "vue"
import { loadImage } from "@/modules/functions"

export function useLoadingImage(trackId) {
	const isImageLoading = ref(false)
	const imageUrl = ref("")

	watch(
		trackId,
		() => {
			loadImage(toValue(trackId), isImageLoading, imageUrl)

			setTimeout(() => {
				if (isImageLoading.value) {
					imageUrl.value = "/image_not_loaded.png"
				}
			}, 3000)
		},
		{ immediate: true },
	)

	return imageUrl
}
