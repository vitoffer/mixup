<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import BaseLayout from "@/components/BaseLayout.vue"
import TrackInfo from "@/components/track-page/TrackInfo.vue"
import MixedTrackList from "@/components/track-page/MixedTrackList.vue"
import { findTrack, loadTrack } from "@/modules/trackPage"

const track = ref(null)
const isTrackLoading = ref(false)

const route = useRoute()

watch(
	() => route.params.id,
	async () => {
		track.value = findTrack(route.params.id)

		if (!track.value) {
			isTrackLoading.value = true
			track.value = await loadTrack(route.params.id)
			isTrackLoading.value = false
		}
	},
	{ immediate: true },
)
</script>

<template>
	<BaseLayout class="track-page">
		<template v-if="!isTrackLoading">
			<TrackInfo :track="track" />
			<MixedTrackList :mixed-tracks="track.mixedTracks" />
		</template>
	</BaseLayout>
</template>
