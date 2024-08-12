import { ref } from "vue"

export function useTrackItem() {
	const trackItemStyles = ref({})

	const baseTrackItemStyles = {
		backgroundColor: "transparent",
		borderRadius: "0",
		borderColor: "var(--gray-700)",
	}

	const highlightedTrackItemStyles = {
		backgroundColor: "var(--gray-800)",
		borderRadius: "20px",
		borderColor: "transparent",
	}

	function changeTrackItemStyles(event, isSelected) {
		trackItemStyles.value = isSelected
			? highlightedTrackItemStyles
			: baseTrackItemStyles

		const nextSibling = event.target.nextSibling
		if (!nextSibling || !nextSibling.style) {
			return
		}

		nextSibling.style.borderTopColor = isSelected
			? "transparent"
			: "var(--gray-700)"
	}
	return { trackItemStyles, changeTrackItemStyles }
}
