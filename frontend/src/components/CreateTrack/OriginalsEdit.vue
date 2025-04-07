<script setup lang="ts">
import { Track, TrackPlatformSearchResult } from "@/types"
import {
	AutoCompleteCompleteEvent,
	AutoCompleteOptionSelectEvent,
} from "primevue"
import AddedOriginalTracksList from "./AddedOriginalTracksList.vue"
import { ref } from "vue"
import TrackItem from "../TrackItem.vue"
import PlatformTrackSearch from "./PlatformTrackSearch.vue"

const props = defineProps<{
	originalTracksSuggestions: (
		| Track
		| { splitter: boolean; text: string }
		| TrackPlatformSearchResult
	)[]
	originalTracksList: Track[]
}>()

const emit = defineEmits<{
	searchOriginalTrack: [event: AutoCompleteCompleteEvent]
	createOriginal: []
	updateOriginalTracksList: [newValue: Track[]]
}>()

const originalTracksSearchInputRounded = defineModel<boolean>(
	"originalTracksSearchInputRounded",
)
const originalTracksSearch = ref("")

const autocompleteDisabled = ref(false)

function deleteOriginalTrack(title: string) {
	emit(
		"updateOriginalTracksList",
		props.originalTracksList?.filter((track) => track.title !== title),
	)
}

function selectOriginalTrack(event: AutoCompleteOptionSelectEvent) {
	if (
		props.originalTracksList?.find(
			(track) => track.title === event.value.title,
		) === undefined
	) {
		emit("updateOriginalTracksList", [...props.originalTracksList, event.value])
	}
	originalTracksSearch.value = ""
}

function hideFloatLabel() {
	const inputElem = document.querySelector(
		"#searchOriginal",
	) as HTMLInputElement
	inputElem.classList.remove("p-filled")
}
</script>

<template>
	<div class="flex w-full flex-col gap-2">
		<p
			class="text-bold text-lg leading-none text-yellow-700"
			:class="{ 'mb-1': originalTracksList?.length === 0 }"
		>
			Оригиналы:
		</p>
		<AddedOriginalTracksList
			:originalTracksList="originalTracksList!"
			@delete-original-track="deleteOriginalTrack"
		/>
		<FloatLabel variant="in">
			<PlatformTrackSearch
				input-id="searchOriginal"
				v-model:search-model="originalTracksSearch"
				:suggestions="originalTracksSuggestions"
				@search-track="$emit('searchOriginalTrack', $event)"
				@select-track="selectOriginalTrack"
				:disabled="autocompleteDisabled"
				@blur="hideFloatLabel"
				class="original-search"
				empty-search-message="Оригиналов по запросу не найдено"
			>
				<template #footer>
					<div class="mt-1 flex flex-col items-center leading-[1.25rem]">
						<p class="text-cyan-700">Не нашли, что искали?</p>
						<button
							class="text-yellow-700"
							@click="
								() => {
									autocompleteDisabled = true
									$emit('createOriginal')
								}
							"
						>
							Добавьте трек сами!
						</button>
					</div>
					<div class="spacer absolute -bottom-4 left-0 h-6 w-full"></div>
				</template>
			</PlatformTrackSearch>
			<label for="searchOriginal">Поиск трека по базе и на youtube music</label>
		</FloatLabel>
	</div>
</template>

<style></style>
