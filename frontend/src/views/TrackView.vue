<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import MixedTracksSection from "@/components/TrackView/MixedTracksSection.vue"
import TrackInfoSection from "@/components/TrackView/TrackInfoSection.vue"
import BaseLayout from "@/components/utilities/BaseLayout.vue"
import { trackList } from "@/storage"

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
	<BaseLayout class="track-page">
		<template v-if="!isTrackLoading">
			<TrackInfoSection :track="track" />
			<MixedTracksSection :mixed-tracks="track.mixedTracks" />
		</template>
	</BaseLayout>
</template>
