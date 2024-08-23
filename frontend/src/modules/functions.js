export async function loadImage(imageName, isImageLoading, imageUrl) {
	isImageLoading.value = true

	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/images/${imageName}`,
	)
	const blob = await response.blob()
	imageUrl.value = URL.createObjectURL(blob)

	isImageLoading.value = false
}
