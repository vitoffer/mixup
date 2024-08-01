<script setup>
import TrackCardTextElement from "./TrackCardTextElement.vue"

defineProps(["id", "title", "author"])
</script>

<template>
	<div class="flex flex-col items-center gap-[4px]">
		<TrackCardTextElement
			v-for="element in ['h2', 'p']"
			:key="element"
			:element="element"
			:id="id"
			:title="title"
			:author="author"
		/>
	</div>
</template>
