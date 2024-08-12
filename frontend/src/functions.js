export async function loadImage(imageName, isImageLoading, imageUrl) {
	isImageLoading.value = true

	const response = await fetch(`http://localhost:3000/api/images/${imageName}`)
	const blob = await response.blob()
	imageUrl.value = URL.createObjectURL(blob)

	isImageLoading.value = false
}

export function filterTracks(trackList, searchText) {
	return trackList.filter((track) => {
		return (
			track.name.toLowerCase().includes(searchText.toLowerCase()) ||
			track.authors.some((author) =>
				author.toLowerCase().includes(searchText.toLowerCase()),
			) ||
			track.mixedTracks.some((mixedTrack) => {
				return (
					mixedTrack.name.toLowerCase().includes(searchText.toLowerCase()) ||
					mixedTrack.authors.some((author) =>
						author.toLowerCase().includes(searchText.toLowerCase()),
					)
				)
			})
		)
	})
}
