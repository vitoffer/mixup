<script setup lang="ts">
import { ref, computed, Ref } from "vue"
import SearchBar from "@/components/SearchBar.vue"
import { getFilteredTrackList } from "@/modules/trackList"
import axios from "axios"
import TrackItem from "@/components/TrackItem.vue"
import { MixTrack, OriginalTrack, Track } from "@/types"

const searchTrack = ref("")

const trackList: Ref<Track[]> = ref([])

const filteredTrackList = computed(() =>
	getFilteredTrackList(trackList.value, searchTrack.value),
)

loadTracks()

async function loadTracks() {
	// const { data } = await axios.get(
	// 	`${import.meta.env.VITE_BASE_API_URL}/tracks`,
	// )

	const data: Partial<Track>[] = [
		{
			id: "1",
			title: "Track 1 super class",
			artistsNames: ["author1"],
			thumbnailUrl:
				"https://image.winudf.com/v2/image/Y29tLnRyYWNrLm11c2ljdHJhY2ttdXNpY19zY3JlZW5fMV9zcnc3eDF0Mg/screen-1.jpg?fakeurl=1&amp;type=.jpg",
		},
		{
			id: "2",
			title: "Track 2",
			artistsNames: [
				"author2",
				"1231421",
				"pupuasfffffffffffffasfffasfafffffffff",
			],
			thumbnailUrl:
				"https://i.pinimg.com/originals/96/05/59/960559700cb774386fadf0d4284a728f.jpg",
		},
	]

	trackList.value = data as Track[]
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
				<TrackItem :track="track" />
			</li>
		</ul>
	</main>
</template>

<style scoped></style>
