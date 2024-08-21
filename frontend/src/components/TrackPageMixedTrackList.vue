<script setup>
import TrackPageMixedTrackListItem from "@/components/TrackPageMixedTrackListItem.vue"

defineProps(["mixedTracks"])
</script>

<template>
	<ul class="mixed-tracks__list">
		<TrackPageMixedTrackListItem
			v-for="mixedTrack in mixedTracks"
			:key="mixedTrack._id"
			:mixed-track="mixedTrack"
		/>
	</ul>
</template>

<style scoped>
.mixed-tracks__list {
	width: 100%;
}
</style>
