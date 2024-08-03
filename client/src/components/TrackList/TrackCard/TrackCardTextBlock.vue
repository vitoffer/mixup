<script setup>
import TrackCardTextElement from "./TrackCardTextElement.vue"

defineProps(["id", "title", "author"])
</script>

<template>
	<div class="text-block">
		<TrackCardTextElement
			v-for="elementType in ['h2', 'p']"
			:key="elementType"
			:element-type="elementType"
			:id="id"
			:title="title"
			:author="author"
		/>
	</div>
</template>

<style scoped>
.text-block {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}
</style>
