<script setup lang="ts">
import { ref, computed, Ref } from "vue"
import SearchBar from "@/components/SearchBar.vue"
import { getFilteredTrackList } from "@/modules/trackList"
import TrackItem from "@/components/TrackItem.vue"
import { MixTrack, Track } from "@/types"
import axios from "axios"
import { loadTracks, trackList } from "@/storage/storage"

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
