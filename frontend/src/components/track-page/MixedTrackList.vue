<script setup>
import MixedTrackListItem from "@/components/track-page/MixedTrackListItem.vue"

defineProps({
	mixedTracks: {
		type: Array,
		required: true,
		validator(mixedTracks) {
			return mixedTracks.every(
				(mixedTrack) =>
					typeof mixedTrack.name === "string" &&
					mixedTrack.authors.every(
						(mixedTrack) => typeof mixedTrack === "string",
					),
			)
		},
	},
})
</script>

<template>
	<section class="track-page__mixed-tracks mixed-tracks">
		<template v-if="mixedTracks.length !== 0">
			<h3 class="mixed-tracks__title">Mixed треки:</h3>
			<ul class="mixed-tracks__list">
				<MixedTrackListItem
					v-for="mixedTrack in mixedTracks"
					:key="mixedTrack._id"
					:mixed-track="mixedTrack"
				/>
			</ul>
		</template>
		<h3
			class="mixed-tracks__title"
			v-else
		>
			Нет mixed треков
		</h3>
	</section>
</template>

<style scoped>
.track-page__mixed-tracks {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 32px 152px;
}

.mixed-tracks__list {
	width: 100%;
}

.mixed-tracks__title {
	font-size: 24px;
	line-height: 33px;
	font-weight: bold;
	color: var(--cyan-500);
	margin-bottom: 16px;
}
</style>
