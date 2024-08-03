<script setup>
import { onBeforeMount, ref } from "vue"
import TrackCard from "./TrackList/TrackCard.vue"

const trackList = ref([])

onBeforeMount(() => {
	loadData()
})

async function loadData() {
	const response = await fetch("http://localhost:3000/tracks")
	trackList.value = await response.json()
}
</script>

<template>
	<main>
		<div class="tracks-grid">
			<TrackCard
				v-for="track in trackList"
				:key="track.id"
				:track="track"
			/>
		</div>
	</main>
</template>

<style scoped>
main {
	margin: auto;
	display: flex;
	justify-content: center;
}

.tracks-grid {
	display: grid;
	grid-template-columns: repeat(4, min-content);
	gap: 24px;
}
</style>
