import { ref, toValue, watch, watchEffect } from "vue"

async function loadImage(trackId, isImageLoading, imageUrl) {
	isImageLoading.value = true

	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/thumbnails/${trackId}`,
	)
	const blob = await response.blob()
	imageUrl.value = URL.createObjectURL(blob)

	isImageLoading.value = false
}

export function useLoadingImage(trackId) {
	const isImageLoading = ref(false)
	const imageUrl = ref("")

	watchEffect(() => {
		loadImage(toValue(trackId), isImageLoading, imageUrl)

		setTimeout(() => {
			if (isImageLoading.value) {
				imageUrl.value = "/image_not_loaded.png"
			}
		}, 3000)
	})

	return imageUrl
}
