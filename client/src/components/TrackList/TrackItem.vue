<script setup>
import { ref, computed, onBeforeMount } from "vue"

const props = defineProps(["track"])

const imageUrl = ref("")
const trackStyles = ref({})

onBeforeMount(() => {
	loadImage(props.track.imageName)
})

async function loadImage(imageName) {
	const response = await fetch(`http://localhost:3000/api/images/${imageName}`)

	const blob = await response.blob()

	imageUrl.value = URL.createObjectURL(blob)
}

function mouseEnterTrack(e) {
	Object.assign(trackStyles.value, {
		backgroundColor: "var(--gray-800)",
		borderRadius: "20px",
		borderColor: "transparent",
	})

	if (e.target.nextSibling.style) {
		e.target.nextSibling.style.borderTopColor = "transparent"
	}
}

function mouseLeaveTrack(e) {
	Object.assign(trackStyles.value, {
		backgroundColor: "transparent",
		borderRadius: "0",
		borderColor: "var(--gray-700)",
	})

	if (e.target.nextSibling.style) {
		e.target.nextSibling.style.borderColor = "var(--gray-700)"
	}
}

const youtubeLink = computed(() => {
	return Object.keys(props.track.platformLinks).includes("youtube")
})
</script>

<template>
	<li
		class="track-list__item track"
		@mouseenter="mouseEnterTrack"
		@mouseleave="mouseLeaveTrack"
		:style="trackStyles"
	>
		<a :href="`/tracks/${track._id}`">
			<article class="track__wrapper">
				<img
					class="track__image"
					:src="imageUrl"
					alt="Track image"
				/>
				<div class="track__info">
					<h3 class="track__title">{{ track.name }}</h3>
					<p class="track__author">{{ track.authors.join(", ") }}</p>
				</div>
				<ol class="track__mixed-track-list mixed-track-list">
					<li
						class="mixed-track-list__item"
						v-for="mixedTrack in track.mixedTracks.slice(0, 2)"
						:key="mixedTrack"
					>
						{{ mixedTrack.name }} - {{ mixedTrack.authors.join(", ") }}
					</li>
				</ol>
				<a
					class="track__youtube-link"
					:href="youtubeLink"
					target="_blank"
					v-if="youtubeLink"
				>
					<img
						class="track__youtube-logo"
						src="@/assets/images/youtube_logo.svg"
						alt="Youtube logo"
					/>
				</a>
			</article>
		</a>
	</li>
</template>

<style scoped>
.track-list__item {
	border-top: solid 1px var(--gray-700);
}

.track-list__item:last-child {
	border-bottom: solid 1px var(--gray-700);
}

.track__wrapper {
	display: grid;
	grid-template-columns: 64px 1fr 1fr 52px;
	gap: 32px;
	padding: 8px 16px;
}

.track__image {
	width: 64px;
	aspect-ratio: 1;
	border-radius: 10px;
}

.track__info {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.track__title {
	max-width: 478px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.25rem;
	line-height: 1.6875rem;
	font-weight: bold;
	color: var(--yellow-900);
}

.track__author {
	font-size: 1rem;
	line-height: 1.375rem;
	font-weight: 600;
	color: var(--yellow-700);
}

.track__mixed-track-list {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.mixed-track-list__item {
	list-style: decimal inside;
	font-size: 1rem;
	line-height: 1.375rem;
	color: var(--cyan-700);
}

.track__youtube-link {
	align-self: center;
	justify-self: end;
	padding: 10px;
	line-height: 0;
}

.track__youtube-logo {
	width: 32px;
}
</style>
