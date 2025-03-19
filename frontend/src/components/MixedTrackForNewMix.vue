<script setup lang="ts">
import { useLoadingImage } from "@/composables/loadingImage"

const props = defineProps({
	track: {
		type: Object,
		required: true,
	},
})

const thumbnailUrl = useLoadingImage(() => props.track._id)
</script>

<template>
	<div class="item">
		<img
			class="thumbnail"
			:src="thumbnailUrl"
			alt="Картинка трека"
			width="60"
		/>
		<div>
			<p class="name">{{ track.name }}</p>
			<p class="author">{{ track.authors.join(", ") }}</p>
		</div>
	</div>
</template>

<style scoped>
.item {
	display: flex;
	align-items: center;
	gap: 16px;
}

.thumbnail {
	border-radius: 10px;
}

.name {
	font-size: 1rem;
	color: var(--yellow-900);
	font-weight: bold;
}

.author {
	font-size: 0.875rem;
	color: var(--yellow-700);
	font-weight: 600;
}
</style>
