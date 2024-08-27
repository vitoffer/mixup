<script setup>
import BaseLayout from "@/components/BaseLayout.vue"
import TrackInfo from "@/components/track-page/TrackInfo.vue"
import MixedTrackList from "@/components/track-page/MixedTrackList.vue"
import { useTrackPage } from "@/composables/trackPage"

const { track, isTrackLoading } = useTrackPage()
</script>

<template>
	<BaseLayout class="track-page">
		<template v-if="!isTrackLoading">
			<TrackInfo :track="track" />
			<MixedTrackList :mixed-tracks="track.mixedTracks" />
		</template>
	</BaseLayout>
</template>
