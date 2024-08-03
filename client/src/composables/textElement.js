import { getAbsoluteCoords, isTextClamped, linesCount } from "@/functions"
import { nextTick, reactive, ref } from "vue"

export function useTextElement(title, author, elementType) {
	const element = ref()

	const elementClass = elementType == "h2" ? "title" : "author"
	const textContent = elementType == "h2" ? title : author

	const elementStyles = reactive({
		display: "-webkit-box",
		lineClamp: elementClass == "title" ? 2 : 1,
	})

	const renderEmptyBlock = ref(false)

	async function showFull() {
		if (
			(elementClass == "title" &&
				(linesCount(element.value) == 1 || !isTextClamped(element.value))) ||
			(elementClass == "author" && !isTextClamped(element.value))
		) {
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
			left: cardRect.width / 2 - elementRect.width / 2 - 16 + "px",
			zIndex: 1,
			backgroundColor: "var(--light-gray)",
			display: "block",
		})
	}

	function hideFull() {
		renderEmptyBlock.value = false

		Object.assign(elementStyles, {
			display: "-webkit-box",
			zIndex: "auto",
			backgroundColor: "transparent",
		})
	}

	return {
		element,
		elementStyles,
		elementClass,
		textContent,
		renderEmptyBlock,
		showFull,
		hideFull,
	}
}
