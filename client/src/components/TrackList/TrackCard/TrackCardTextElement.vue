<script setup>
import EmptyBlock from "@/components/utilities/EmptyBlock.vue"
import { useTextElement } from "@/composables/textElement"

const props = defineProps(["id", "title", "author", "elementType"])

const {
	element,
	elementStyles,
	elementClass,
	textContent,
	renderEmptyBlock,
	showFull,
	hideFull,
} = useTextElement(props.title, props.author, props.elementType)
</script>

<template>
	<component
		ref="element"
		:is="elementType"
		:class="elementClass"
		:style="{
			...elementStyles,
			position: renderEmptyBlock ? 'absolute' : '',
		}"
		@mouseover="showFull"
		@mouseout="hideFull"
	>
		{{ textContent }}
	</component>
	<EmptyBlock v-if="renderEmptyBlock" />
</template>

<style scoped>
.title,
.author {
	line-height: 1.3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	max-width: 150%;
}

.title {
	font-size: 18px;
	color: var(--yellow);
}

.author {
	font-family: var(--font-nunito-sans);
	tab-size: 16px;
	color: var(--light-yellow);
}
</style>
