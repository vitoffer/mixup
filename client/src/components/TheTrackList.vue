<script setup>
import TrackItem from "./TrackList/TrackItem.vue"
// import trackList from "@/dev/trackList"

import { addTrackToList, trackList } from "../storage"
import { onMounted } from "vue"

onMounted(() => {
	loadAllTracks()
})

async function loadAllTracks() {
	const response = await fetch("http://localhost:3000/api/tracks")
	const tracks = await response.json()

	tracks.forEach((track) => {
		addTrackToList(track)
	})
}
</script>

<template>
	<main class="container">
		<ul class="track-list">
			<TrackItem
				v-for="track in trackList"
				:key="track.id"
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
