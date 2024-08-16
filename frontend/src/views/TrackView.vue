<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import MixedTracksSection from "@/components/TrackView/MixedTracksSection.vue"
import TrackInfoSection from "@/components/TrackView/TrackInfoSection.vue"
import BaseLayout from "@/components/utilities/BaseLayout.vue"
import { findTrack, loadTrack } from "../modules/trackPage"

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

<template>
	<BaseLayout class="track-page">
		<template v-if="!isTrackLoading">
			<TrackInfoSection :track="track" />
			<MixedTracksSection :mixed-tracks="track.mixedTracks" />
		</template>
	</BaseLayout>
</template>
