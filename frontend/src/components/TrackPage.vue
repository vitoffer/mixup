<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import TrackPageInfoSection from "@/components/TrackPageInfoSection.vue"
import TrackPageMixedTracksSection from "@/components/TrackPageMixedTracksSection.vue"
import { findTrack, loadTrack } from "@/modules/trackPage"

const route = useRoute()

const track = ref()
const isTrackLoading = ref(false)

watch(
	() => route.params.id,
	() => {
		track.value = findTrack(route.params.id)

		if (!track.value) {
			loadTrack(route.params.id, track, isTrackLoading)
		}
	},
	{ immediate: true },
)
</script>

<template v-if="!isTrackLoading">
	<TrackPageInfoSection :track="track" />
	<TrackPageMixedTracksSection :mixed-tracks="track.mixedTracks" />
</template>
