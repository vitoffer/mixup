<script setup>
import EmptyBlock from "@/components/utilities/EmptyBlock.vue"
import { useTrackInside } from "@/composables/trackInside"

defineProps(["track"])

const { element, elementStyles, renderEmptyBlock, showFull, hideFull } =
	useTrackInside()
</script>

<template>
	<li
		ref="element"
		class="list-item"
		:style="{
			...elementStyles,
			position: renderEmptyBlock ? 'absolute' : '',
		}"
		@mouseover="showFull"
		@mouseout="hideFull"
	>
		<span :style="{ fontWeight: 'bold' }">&bull;</span>
		{{ track }}
	</li>
	<EmptyBlock v-if="renderEmptyBlock" />
</template>

<style scoped>
.list-item {
	max-width: 256px;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
