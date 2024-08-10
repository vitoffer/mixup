<script setup>
import { ref } from "vue"
import TrackItem from "./TrackList/TrackItem.vue"
import { addTrackToList, trackList } from "@/storage"

const isLoading = ref(false)

if (trackList.value.length === 0) {
	loadAllTracks()
}

async function loadAllTracks() {
	isLoading.value = true

	const response = await fetch("http://localhost:3000/api/tracks")
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
				v-for="track in trackList"
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
