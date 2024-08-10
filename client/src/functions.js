export async function loadImage(imageName, isImageLoading, imageUrl) {
	isImageLoading.value = true

	const response = await fetch(`http://localhost:3000/api/images/${imageName}`)
	const blob = await response.blob()
	imageUrl.value = URL.createObjectURL(blob)

	isImageLoading.value = false
}
