<script setup>
import MixedTrackList from "@/components/TrackView/MixedTracks/MixedTrackList.vue"

defineProps(["mixedTracks"])
</script>

<template>
	<section class="track-page__mixed-tracks mixed-tracks">
		<template v-if="mixedTracks.length !== 0">
			<h3 class="mixed-tracks__title">Mixed треки:</h3>
			<MixedTrackList :mixed-tracks="mixedTracks" />
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

.mixed-tracks__title {
	font-size: 24px;
	line-height: 33px;
	font-weight: bold;
	color: var(--cyan-500);
	margin-bottom: 16px;
}
</style>
