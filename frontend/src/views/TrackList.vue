<script setup lang="ts">
import { ref, computed, watchEffect, Ref } from "vue"
import SearchBar from "@/components/track-list/SearchBar.vue"
import { getFilteredTrackList } from "@/modules/trackList"
import axios from "axios"
import TrackItem from "@/components/TrackItem.vue"
import { MixTrack, OriginalTrack } from "@/types"

const searchTrack = ref("")

const trackList: Ref<(MixTrack | OriginalTrack)[]> = ref([])

const filteredTrackList = computed(() =>
	getFilteredTrackList(trackList.value, searchTrack.value),
)

loadTracks()

async function loadTracks() {
	// const { data } = await axios.get(
	// 	`${import.meta.env.VITE_BASE_API_URL}/tracks`,
	// )

	const data: Partial<MixTrack | OriginalTrack>[] = [
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

	trackList.value = data as (MixTrack | OriginalTrack)[]
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
			<!-- <BaseTrackItem
				v-for="track in filteredTrackList"
				:key="track._id"
				:track="track"
			>
				<template #mixed-track-list>
					<ol class="track__mixed-track-list mixed-track-list">
						<li
							class="mixed-track-list__item"
							v-for="mixedTrack in track.mixedTracks.slice(0, 2)"
							:key="mixedTrack"
						>
							{{ mixedTrack.name }} - {{ mixedTrack.authors.join(", ") }}
						</li>
					</ol>
				</template>
				<template #youtube-link>
					<a
						v-if="hasYoutubeLink(track.platformLinks)"
						:href="hasYoutubeLink(track.platformLinks)"
						class="track__youtube-link"
						target="_blank"
						@click.stop
					>
						<img
							class="track__youtube-logo"
							src="@/assets/images/youtube_logo.svg"
							alt="Youtube logo"
						/>
					</a>
				</template>
			</BaseTrackItem> -->
		</ul>
	</main>
</template>

<style scoped>
.container {
	width: 1200px;
	margin: 32px auto;
}

.track__mixed-track-list {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.mixed-track-list__item {
	list-style: decimal inside;
	font-size: 1rem;
	line-height: 1.375rem;
	color: var(--cyan-700);
}

.track__youtube-link {
	align-self: center;
	justify-self: end;
	padding: 10px;
	line-height: 0;
}

.track__youtube-logo {
	width: 32px;
}

:deep(.track-item__content) {
	display: grid;
	grid-template-columns: 64px 1fr 1fr 52px;
	padding: 8px 16px;
}

:deep(.track__thumbnail) {
	width: 64px;
}

:deep(.track__info) {
	justify-content: center;
}

:deep(.track__name) {
	max-width: 478px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.25rem;
	line-height: 1.6875rem;
}

:deep(.track__author) {
	font-size: 1rem;
	line-height: 1.375rem;
}
</style>
