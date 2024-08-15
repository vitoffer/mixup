<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import MixedTracksSection from "@/components/TrackPage/MixedTracksSection.vue"
import TrackInfoSection from "@/components/TrackPage/TrackInfoSection.vue"
import { trackList } from "@/storage"

const appHeight = document.querySelector("#app").getBoundingClientRect().height
const headerHeight = document
	.querySelector(".header")
	.getBoundingClientRect().height
const elementHeight = ref(appHeight - headerHeight - 32 * 2 + "px")

const route = useRoute()

const track = ref()
const isTrackLoading = ref(false)

watch(
	() => route.params.id,
	() => {
		track.value = findTrack(route.params.id)

		if (!track.value) {
			loadTrack(route.params.id)
		}
	},
	{ immediate: true },
)

function findTrack(id) {
	return trackList.find((track) => track._id === id) ?? null
}

async function loadTrack(id) {
	isTrackLoading.value = true

	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/tracks/${id}`,
	)
	track.value = await response.json()

	isTrackLoading.value = false
}
</script>

<template>
	<article class="container track-page">
		<template v-if="!isTrackLoading">
			<TrackInfoSection :track="track" />
			<MixedTracksSection :mixed-tracks="track.mixedTracks" />
		</template>
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
