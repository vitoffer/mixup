<script setup>
import EmptyBlock from "@/components/utilities/EmptyBlock.vue"
import {
	isEllipsisActive,
	isTextClamped,
	linesCount,
} from "@/scripts/functions"
import { nextTick, reactive, ref } from "vue"

const props = defineProps(["id", "title", "author", "element"])

const renderEmptyBlock = ref(false)
const textElement = ref(null)
const textElementStyles = reactive({
	maxWidth: "256px",
	lineHeight: "1.3",
	...generateStyles(props.element),
})

let textElementClass = chooseClass(props.element)

function chooseClass(el) {
	if (el == "h2") {
		return "title"
	} else {
		return "author"
	}
}

function generateStyles(el) {
	let stylesList = {}

	if (el == "h2") {
		stylesList = {
			fontSize: "18px",
			color: "var(--yellow)",
			overflow: "hidden",
			display: "-webkit-box",
			"-webkit-box-orient": "vertical",
			"-webkit-line-clamp": "2",
		}
	} else {
		stylesList = {
			fontFamily: "var(--font-nunito-sans)",
			textSize: "16px",
			color: "var(--light-yellow)",
			overflow: "hidden",
			display: "-webkit-box",
			"-webkit-box-orient": "vertical",
			"-webkit-line-clamp": "1",
		}
	}

	return stylesList
}

function chooseTextContent(el) {
	let textContent = ""
	if (el == "h2") {
		textContent += props.title
	} else {
		textContent += "by " + props.author
	}
	return textContent
}

function getCoords(elem) {
	let box = elem.getBoundingClientRect()

	return {
		top: box.top + window.scrollY,
		right: box.right + window.scrollX,
		bottom: box.bottom + window.scrollY,
		left: box.left + window.scrollX,
	}
}

async function showFull() {
	if (
		(textElementClass == "title" && linesCount(textElement.value) == 1) ||
		(textElementClass == "title" && !isTextClamped(textElement.value)) ||
		(textElementClass == "author" &&
			!isEllipsisActive(textElement.value) &&
			!isTextClamped(textElement.value))
	) {
		return
	}
	renderEmptyBlock.value = true

	const textElemCoords = getCoords(textElement.value)
	const cardCoords = getCoords(textElement.value.closest(".card"))

	await nextTick()

	Object.assign(textElementStyles, {
		top: textElemCoords.top - cardCoords.top + "px",
		left: cardCoords.width / 2 - textElemCoords.width / 2 + "px",
		maxWidth: "150%",
		zIndex: 1,
		backgroundColor: "var(--light-gray)",
	})

	for (const p of [
		"overflow",
		"display",
		"-webkit-box-orient",
		"-webkit-line-clamp",
	]) {
		delete textElementStyles[p]
	}
}

function hideFull() {
	renderEmptyBlock.value = false

	Object.assign(textElementStyles, {
		overflow: "hidden",
		display: "-webkit-box",
		"-webkit-box-orient": "vertical",
	})

	if (textElementClass == "title") {
		textElementStyles["-webkit-line-clamp"] = "2"
	} else {
		textElementStyles["-webkit-line-clamp"] = "1"
	}

	textElementStyles.maxWidth = "256px"

	delete textElementStyles["zIndex"]
	delete textElementStyles["backgroundColor"]
}
</script>

<template>
	<component
		ref="textElement"
		:is="element"
		:class="textElementClass"
		:style="{
			...textElementStyles,
			position: renderEmptyBlock ? 'absolute' : '',
		}"
		@mouseover="showFull"
		@mouseout="hideFull"
	>
		{{ chooseTextContent(element) }}
	</component>
	<EmptyBlock v-if="renderEmptyBlock" />
</template>
