<script setup>
import { ref, computed } from "vue"
import SearchBar from "@/components/track-list/SearchBar.vue"
import { trackList } from "@/storage/storage"
import { filterTracks, loadAllTracks } from "@/modules/trackList"
import TrackItem from "@/components/track-list/TrackItem.vue"

const searchTrack = ref("")

if (trackList.length === 0) {
	loadAllTracks()
}

const filteredTrackList = computed(() => {
	return filterTracks(trackList, searchTrack.value)
})
</script>

<template>
	<SearchBar v-model:search-track="searchTrack" />
	<main class="container">
		<ul class="track-list">
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
