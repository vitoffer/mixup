<script setup>
import { useLoadingImage } from "@/composables/loadingImage"
import { useTrackItem } from "@/composables/trackItem"
import { hasYoutubeLink } from "@/modules/trackList"

const props = defineProps({
	track: {
		type: Object,
		required: true,
		validator(track) {
			return (
				typeof track.name === "string" &&
				track.authors.every((author) => typeof author === "string")
			)
		},
	},
})

const { trackItemStyles, changeTrackItemStyles } = useTrackItem()

const imageUrl = useLoadingImage(props.track.imageName)
</script>

<template>
	<li
		class="track-list__item track"
		@mouseenter="changeTrackItemStyles($event, true)"
		@mouseleave="changeTrackItemStyles($event, false)"
		:style="trackItemStyles"
	>
		<RouterLink :to="`/tracks/${track._id}`">
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
					v-if="hasYoutubeLink(track.platformLinks)"
					:href="hasYoutubeLink(track.platformLinks)"
					class="track__youtube-link"
					target="_blank"
					@click.stop
				>
					<img
						class="track__youtube-logo"
						src="@/assets/images/youtube_logo.svg"
						alt="Youtube logo"
					/>
				</a>
			</article>
		</RouterLink>
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
