<script setup>
import EmptyBlock from "@/components/utilities/EmptyBlock.vue"
import { isEllipsisActive } from "@/scripts/functions"
import { nextTick, reactive, ref } from "vue"

defineProps(["track"])

const renderEmptyBlock = ref(false)
const listElement = ref()

const listElementStyles = reactive({
	maxWidth: "256px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
})

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
	if (!isEllipsisActive(listElement.value)) {
		return
	}
	renderEmptyBlock.value = true

	const textElemCoords = getCoords(listElement.value)
	const cardCoords = getCoords(listElement.value.closest(".card"))

	await nextTick()

	Object.assign(listElementStyles, {
		top: textElemCoords.top - cardCoords.top + "px",
		left: cardCoords.width / 2 - textElemCoords.width / 2 + "px",
		width: "384px",
		zIndex: 1,
		backgroundColor: "var(--light-gray)",
	})

	for (const p of ["whiteSpace", "overflow", "textOverflow"]) {
		delete listElementStyles[p]
	}
}

function hideFull() {
	renderEmptyBlock.value = false

	Object.assign(listElementStyles, {
		width: "384px",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	})

	delete listElementStyles["backgroundColor"]
	delete listElementStyles["zIndex"]
}
</script>

<template>
	<li
		ref="listElement"
		class="list-elem"
		:style="{
			...listElementStyles,
			position: renderEmptyBlock ? 'absolute' : '',
		}"
		@mouseover="showFull"
		@mouseout="hideFull"
	>
		&bull; {{ track }}
	</li>
	<EmptyBlock v-if="renderEmptyBlock" />
</template>
