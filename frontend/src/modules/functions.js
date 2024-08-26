export async function loadImage(imageName, isImageLoading, imageUrl) {
	isImageLoading.value = true

	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/images/${imageName}`,
	)
	const blob = await response.blob()
	imageUrl.value = URL.createObjectURL(blob)

	isImageLoading.value = false
}

export function generateTrackItemStyles(type) {
	if (type === "default")
		return {
			"track-item__content": {
				display: "grid",
				gridTemplateColumns: "64px 1fr 1fr 52px",
				padding: "8px 16px",
			},
			track__image: {
				width: "64px",
			},
			track__info: {
				justifyContent: "center",
			},
			track__name: {
				maxWidth: "478px",
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				fontSize: "1.25rem",
				lineHeight: "1.6875rem",
			},
			track__author: {
				fontSize: "1rem",
				lineHeight: "1.375rem",
			},
		}

	return {
		"track-item__content": {
			display: "flex",
			alignItems: "center",
			gap: "32px",
			padding: "16px 32px",
		},
		track__image: {
			width: "100px",
		},
		track__info: {
			gap: "10px",
		},
		track__name: {
			fontSize: "1.5rem",
			lineHeight: "2.0625rem",
		},
		track__author: {
			fontSize: "1.25rem",
			lineHeight: "1.6875rem",
		},
	}
}
