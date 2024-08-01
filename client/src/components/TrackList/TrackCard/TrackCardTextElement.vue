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
const textElementStyle = reactive({
	maxWidth: "256px",
})

let textElementClasses = ref([
	"leading-[1.3]",
	...generateClasses(props.element),
])

function generateClasses(el) {
	let classList = []
	if (el == "h2") {
		classList.push("title", "line-clamp-2", "text-[18px]", "text-yellow")
	} else {
		classList.push(
			"author",
			"font-accent",
			"text-[16px]",
			"text-yellow-light",
			"line-clamp-1",
		)
	}

	return classList
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
		(textElementClasses.value.includes("title") &&
			linesCount(textElement.value) == 1) ||
		(textElementClasses.value.includes("title") &&
			!isTextClamped(textElement.value)) ||
		(textElementClasses.value.includes("author") &&
			!isEllipsisActive(textElement.value) &&
			!isTextClamped(textElement.value))
	) {
		return
	}
	renderEmptyBlock.value = true

	const textElemCoords = getCoords(textElement.value)
	const cardCoords = getCoords(textElement.value.closest(".card"))

	await nextTick()

	textElementStyle.top = textElemCoords.top - cardCoords.top + "px"
	textElementStyle.left = cardCoords.width / 2 - textElemCoords.width / 2 + "px"
	textElementStyle.maxWidth = "150%"
	textElementStyle.zIndex = "1"

	textElementClasses.value = textElementClasses.value.filter(
		(item) => !["line-clamp-1", "line-clamp-2"].includes(item),
	)
	textElementClasses.value.push("bg-gray-light")
}

function hideFull() {
	renderEmptyBlock.value = false

	textElementStyle.maxWidth = "256px"
	textElementStyle.zIndex = ""

	textElementClasses.value.push(
		textElementClasses.value.includes("title")
			? "line-clamp-2"
			: "line-clamp-1",
	)

	textElementClasses.value = textElementClasses.value.filter(
		(item) => item != "bg-gray-light",
	)
}
</script>

<template>
	<component
		ref="textElement"
		:is="element"
		:class="[
			textElementClasses,
			{
				absolute: renderEmptyBlock,
			},
		]"
		:style="textElementStyle"
		@mouseover="showFull"
		@mouseout="hideFull"
	>
		{{ chooseTextContent(element) }}
	</component>
	<EmptyBlock v-if="renderEmptyBlock" />
</template>
