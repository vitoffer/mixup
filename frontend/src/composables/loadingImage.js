import { ref, watch } from "vue"
import { loadImage } from "@/modules/functions"

export function useLoadingImage(imageName, track = () => null) {
	const isImageLoading = ref(false)
	const imageUrl = ref("")

	watch(
		track,
		() => {
			loadImage(imageName || track().imageName, isImageLoading, imageUrl)

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
