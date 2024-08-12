<script setup>
import { computed, ref } from "vue"
import TrackItem from "@/components/TrackList/TrackItem.vue"
import { addTrackToList, trackList } from "@/storage"
import { filterTracks } from "../functions"

const props = defineProps(["searchTrack"])

const isLoading = ref(false)

if (trackList.length === 0) {
	loadAllTracks()
}

const filteredTrackList = computed(() => {
	return filterTracks(trackList, props.searchTrack)
})

async function loadAllTracks() {
	isLoading.value = true

	const response = await fetch(`http://localhost:3000/api/tracks`)
	const tracks = await response.json()

	tracks.forEach((track) => {
		addTrackToList(track)
	})

	isLoading.value = false
}
</script>

<template>
	<main class="container">
		<ul
			class="track-list"
			v-if="!isLoading"
		>
			<TrackItem
				v-for="track in filteredTrackList"
				:key="track._id"
				:track="track"
			/>
		</ul>
	</main>
</template>

<style scoped>
.container {
	width: 1200px;
	margin: 32px auto;
}
</style>
