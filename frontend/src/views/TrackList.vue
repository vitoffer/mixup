<script setup lang="ts">
import { ref, computed } from "vue"
import SearchBar from "@/components/SearchBar.vue"
import {
	getFilteredTrackList,
	loadTracks,
	trackList,
} from "@/modules/trackList"
import TrackItem from "@/components/TrackItem.vue"

const searchTrack = ref("")

const filteredTrackList = computed(() =>
	getFilteredTrackList(trackList.value, searchTrack.value),
)

localLoadTracks()

async function localLoadTracks() {
	trackList.value = await loadTracks()
}
</script>

<template>
	<SearchBar v-model="searchTrack" />
	<main class="mt-6">
		<ul class="track-list">
			<li
				v-for="track in filteredTrackList"
				:key="track.id"
				class="not-first:-translate-y-[1px]"
			>
				<TrackItem
					:track="track"
					with-links
				/>
			</li>
		</ul>
	</main>
</template>

<style scoped></style>
