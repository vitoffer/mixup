<script setup>
import EmptyBlock from "@/components/utilities/EmptyBlock.vue"
import { ref } from "vue"

const props = defineProps(["id", "title", "author", "element"])

const renderEmptyBlock = ref(false)
const textElement = ref()

function generateClasses(el) {
	let classList = ["leading-[1.3]"]
	if (el == "h2") {
		classList.push("title", "line-clamp-2", "text-[18px]", "text-yellow")
	} else {
		classList.push(
			"author",
			"line-clamp-1",
			"font-accent",
			"text-[16px]",
			"text-yellow-light",
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

function generateEmptyBlockClasses() {
	const classList = []
	classList.push(textElement.value.clientHeight)
}

function showFull() {
	renderEmptyBlock.value = true
}

function hideFull() {
	renderEmptyBlock.value = false
}

// function showFullText(event) {
// 	const el = event.target

// 	if (
// 		(linesCount(el) >= 2 && !isClamped(el)) ||
// 		(linesCount(el) == 1 &&
// 			el.classList.contains("author") &&
// 			!isClamped(el)) ||
// 		(linesCount(el) == 1 &&
// 			!el.classList.contains("author") &&
// 			!isEllipsisActive(el))
// 	) {
// 		return
// 	}

// 	drawFullTextWidget(el)

// 	el.classList.remove("line-clamp-1", "line-clamp-2")
// }

// function hideFullText(event) {
// 	const el = event.target

// 	clearFullTextWidget(el)

// 	if (el.classList.contains("author")) {
// 		el.classList.add("line-clamp-1")
// 	}
// 	if (el.classList.contains("title")) {
// 		el.classList.add("line-clamp-2")
// 	}
// }

// function isClamped(e) {
// 	return e.scrollHeight - e.clientHeight > 5
// }

// function linesCount(el) {
// 	const divHeight = el.clientHeight

// 	const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight)

// 	const lines = Math.round(divHeight / lineHeight)
// 	return lines
// }
</script>

<template>
	<component
		:ref="textElement"
		:is="element"
		:class="generateClasses(element)"
		@mouseover="showFull"
		@mouseout="hideFull"
	>
		{{ chooseTextContent(element) }}
	</component>
	<EmptyBlock
		v-if="renderEmptyBlock"
		:class="generateEmptyBlockClasses()"
	/>
</template>
