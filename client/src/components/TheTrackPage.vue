<script setup>
import { onBeforeMount, ref } from "vue"
import MixedTracks from "./TrackPage/MixedTracks.vue"
import TrackInfo from "./TrackPage/TrackInfo.vue"
import { useRoute } from "vue-router"
// import trackList from "@/dev/trackList"
import { trackList } from "../storage"

const route = useRoute()

console.log(trackList.value)

const track = ref()

onBeforeMount(() => {
	loadTrack(route.params.id)
})

async function loadTrack(id) {
	const response = await fetch(`http://localhost:3000/api/tracks/${id}`)

	track.value = await response.json()

	console.log(track.value)
}

const appHeight = document.querySelector("#app").getBoundingClientRect().height
const headerHeight = document
	.querySelector(".header")
	.getBoundingClientRect().height

const elementHeight = ref(appHeight - headerHeight - 32 * 2 + "px")
</script>

<template>
	<article class="container track-page">
		<TrackInfo :track="track" />
		<MixedTracks :track="track" />
	</article>
</template>

<style scoped>
.container {
	width: 1200px;
	height: v-bind("elementHeight");
	margin: 32px auto;
	border-inline: solid 1px var(--gray-700);
}
</style>
