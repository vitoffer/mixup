<script setup>
import EmptyBlock from "@/components/utilities/EmptyBlock.vue"
import { isEllipsisActive } from "@/scripts/functions"
import { nextTick, reactive, ref } from "vue"

defineProps(["track"])

const renderEmptyBlock = ref(false)
const listElement = ref()
const listElementStyle = reactive({})
const listElementClasses = ref([
	"max-w-256px",
	"overflow-hidden",
	"text-ellipsis",
	"whitespace-nowrap",
])

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

	listElementStyle.top = textElemCoords.top - cardCoords.top + "px"
	listElementStyle.left = cardCoords.width / 2 - textElemCoords.width / 2 + "px"
	listElementStyle.width = "384px"
	listElementStyle.zIndex = "1"

	listElementClasses.value = listElementClasses.value.filter(
		(item) =>
			!["whitespace-nowrap", "overflow-hidden", "text-ellipsis"].includes(item),
	)
	listElementClasses.value.push("bg-gray-light")
}

function hideFull() {
	renderEmptyBlock.value = false

	listElementStyle.width = "384px"
	listElementStyle.zIndex = ""

	listElementClasses.value.push(
		"overflow-hidden",
		"text-ellipsis",
		"whitespace-nowrap",
	)
	listElementClasses.value = listElementClasses.value.filter(
		(item) => item != "bg-gray-light",
	)
}
</script>

<template>
	<!-- TODO change classes to styles -->
	<li
		ref="listElement"
		:class="[...listElementClasses, { absolute: renderEmptyBlock }]"
		@mouseover="showFull"
		@mouseout="hideFull"
		:style="listElementStyle"
	>
		&bull; {{ track }}
	</li>
	<EmptyBlock v-if="renderEmptyBlock" />
</template>
