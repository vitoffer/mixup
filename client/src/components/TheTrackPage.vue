<script setup>
import { ref } from "vue"
import OriginalTracks from "./TrackPage/OriginalTracks.vue"
import TrackInfo from "./TrackPage/TrackInfo.vue"

const appHeight = document.querySelector("#app").getBoundingClientRect().height
const headerHeight = document
	.querySelector(".header")
	.getBoundingClientRect().height

const elementHeight = ref(appHeight - headerHeight - 32 * 2 + "px")
</script>

<template>
	<article class="container track-page">
		<TrackInfo />
		<OriginalTracks />
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
