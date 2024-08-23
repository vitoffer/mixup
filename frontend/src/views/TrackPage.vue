<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import BaseLayout from "@/components/BaseLayout.vue"
import TrackInfo from "@/components/track-page/TrackInfo.vue"
import MixedTrackList from "@/components/track-page/MixedTrackList.vue"
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

<template>
	<BaseLayout class="track-page">
		<TrackInfo :track="track" />
		<MixedTrackList :mixed-tracks="track.mixedTracks" />
	</BaseLayout>
</template>
