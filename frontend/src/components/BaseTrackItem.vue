<script setup>
import { ref } from "vue"
import { useLoadingImage } from "@/composables/loadingImage"
import { isTrackValid } from "@/modules/validators"

const props = defineProps({
	track: {
		type: Object,
		required: true,
		validator: isTrackValid,
	},
})

const isHighlighted = ref(false)

const thumbnailUrl = useLoadingImage(() => props.track._id)
</script>

<template>
	<li
		class="track-list__item track-item"
		@mouseenter="isHighlighted = true"
		@mouseleave="isHighlighted = false"
		:class="{ highlighted: isHighlighted }"
	>
		<RouterLink :to="`/tracks/${track._id}`">
			<article class="track-item__content track">
				<img
					class="track__thumbnail"
					:src="thumbnailUrl"
					alt="Track thumbnail"
				/>
				<div class="track__info">
					<p class="track__name">
						{{ track.name }}
					</p>
					<p class="track__author">
						{{ track.authors.join(", ") }}
					</p>
				</div>
				<slot name="mixed-track-list" />
				<slot name="youtube-link" />
				<slot name="platform-list" />
			</article>
		</RouterLink>
	</li>
</template>

<style scoped>
.track-list__item {
	border-top: solid 1px var(--gray-700);
	background-color: transparent;
	border-radius: 0;
	border-color: var(--gray-700);
}

.track-list__item + * {
	border-top-color: var(--gray-700);
}

.track-list__item:last-child {
	border-bottom: solid 1px var(--gray-700);
}

.track-list__item.highlighted {
	background-color: var(--gray-800);
	border-radius: 20px;
	border-color: transparent;
}

.track-list__item.highlighted + * {
	border-top-color: transparent;
}

/* .track-list__item.highlighted {
	background-color: var(--gray-800);
	border-radius: 20px;
	border-color: transparent;
} */

.track-item__content {
	gap: 32px;
}

.track__thumbnail {
	aspect-ratio: 1;
	border-radius: 10px;
}

.track__info {
	display: flex;
	flex-direction: column;
}

.track__name {
	font-weight: bold;
	color: var(--yellow-900);
}

.track__author {
	font-weight: 600;
	color: var(--yellow-700);
}
</style>
