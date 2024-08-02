<script setup>
import { onMounted, ref } from "vue"
import TrackCard from "./TrackList/TrackCard.vue"

// import trackList from "@/dev/trackList"

const trackList = ref([])

onMounted(() => {
	loadData()
})

async function loadData() {
	const response = await fetch("http://localhost:3000/tracks")
	trackList.value = await response.json()
}
</script>

<template>
	<main class="m-auto flex justify-center">
		<div class="grid grid-cols-[repeat(4,_min-content)] gap-[24px]">
			<TrackCard
				v-for="track in trackList"
				:key="track.id"
				:track="track"
			/>
		</div>
	</main>
</template>
