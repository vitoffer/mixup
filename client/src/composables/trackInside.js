import { getAbsoluteCoords, isEllipsisActive } from "@/functions"
import { nextTick, reactive, ref } from "vue"

export function useTrackInside() {
	const renderEmptyBlock = ref(false)
	const element = ref()

	const elementStyles = reactive({
		whiteSpace: "nowrap",
	})

	async function showFull() {
		if (!isEllipsisActive(element.value)) {
			return
		}
		renderEmptyBlock.value = true

		const card = element.value.closest(".card")

		const elementAbsoluteCoords = getAbsoluteCoords(element.value)
		const elementRect = element.value.getBoundingClientRect()

		const cardAbsoluteCoords = getAbsoluteCoords(card)
		const cardRect = card.getBoundingClientRect()

		await nextTick()

		Object.assign(elementStyles, {
			top: elementAbsoluteCoords.top - cardAbsoluteCoords.top + "px",
			left: cardRect.width / 2 - elementRect.width / 2 + "px",
			zIndex: 1,
			backgroundColor: "var(--light-gray)",
			whiteSpace: "normal",
		})
	}

	function hideFull() {
		renderEmptyBlock.value = false

		Object.assign(elementStyles, {
			whiteSpace: "nowrap",
			backgroundColor: "transparent",
			zIndex: "auto",
		})
	}

	return {
		element,
		elementStyles,
		renderEmptyBlock,
		showFull,
		hideFull,
	}
}
