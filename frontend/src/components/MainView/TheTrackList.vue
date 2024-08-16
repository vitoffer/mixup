<script setup>
import { computed, ref } from "vue"
import TrackItem from "@/components/MainView/TrackList/TrackItem.vue"
import { trackList } from "@/storage"
import { filterTracks, loadAllTracks } from "@/modules/trackList"

const props = defineProps(["searchTrack"])

const isLoading = ref(false)

if (trackList.length === 0) {
	loadAllTracks(isLoading)
}

const filteredTrackList = computed(() => {
	return filterTracks(trackList, props.searchTrack)
})
</script>

<template>
	<main class="container">
		<ul
			class="track-list"
			v-if="!isLoading"
		>
			<TrackItem
				v-for="track in filteredTrackList"
				:key="track._id"
				:track="track"
			/>
		</ul>
	</main>
</template>

<style scoped>
.container {
	width: 1200px;
	margin: 32px auto;
}
</style>
