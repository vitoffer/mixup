<script setup>
import { ref } from "vue"
import MixedTracks from "./TrackPage/MixedTracks.vue"
import TrackInfo from "./TrackPage/TrackInfo.vue"
import { useRoute } from "vue-router"
import trackList from "@/dev/trackList"

const route = useRoute()

const track = trackList.find((track) => track.id == route.params.id)

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
