<script setup>
import { ref, computed } from "vue"
import SearchBar from "@/components/SearchBar.vue"
import BaseTrackItem from "@/components/BaseTrackItem.vue"
import { trackList } from "@/storage/storage"
import { filterTracks, loadAllTracks } from "@/modules/trackList"

const searchTrack = ref("")

const isLoading = ref(false)

if (trackList.length === 0) {
	loadAllTracks(isLoading)
}

const filteredTrackList = computed(() => {
	return filterTracks(trackList, searchTrack.value)
})
</script>

<template>
	<SearchBar v-model:search-track="searchTrack" />
	<main class="container">
		<ul class="track-list">
			<BaseTrackItem
				v-for="track in filteredTrackList"
				:key="track._id"
				type="default"
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
