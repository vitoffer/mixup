<script setup>
import { ref, computed } from "vue"
import SearchBar from "@/components/track-list/SearchBar.vue"
import { trackList } from "@/storage/storage"
import {
	getFilteredTrackList,
	hasYoutubeLink,
	loadAllTracks,
} from "@/modules/trackList"
import BaseTrackItem from "@/components/BaseTrackItem.vue"

const searchTrack = ref("")

if (trackList.length === 0) {
	loadAllTracks()
}

const filteredTrackList = computed(() =>
	getFilteredTrackList(trackList, searchTrack.value),
)
</script>

<template>
	<SearchBar v-model:search-track="searchTrack" />
	<main class="container">
		<ul class="track-list">
			<BaseTrackItem
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
			</BaseTrackItem>
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
