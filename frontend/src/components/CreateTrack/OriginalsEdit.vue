<script setup lang="ts">
import { Track, TrackSuggestion } from "@/types"
import {
	AutoCompleteCompleteEvent,
	AutoCompleteOptionSelectEvent,
} from "primevue"
import AddedOriginalTracksList from "./AddedOriginalTracksList.vue"
import { ref } from "vue"
import PlatformTrackSearch from "./PlatformTrackSearch.vue"

const props = defineProps<{
	originalTracksSuggestions: {
		label: string
		items: TrackSuggestion[]
	}[]
	originalTracksList: Track[]
}>()

const emit = defineEmits<{
	searchOriginalTrack: [event: AutoCompleteCompleteEvent]
	createOriginal: []
	updateOriginalTracksList: [newValue: Track[]]
}>()

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
		<PlatformTrackSearch
			input-id="searchOriginal"
			v-model:search-model="originalTracksSearch"
			:suggestions="originalTracksSuggestions"
			@search-track="$emit('searchOriginalTrack', $event)"
			@select-track="selectOriginalTrack"
			:disabled="autocompleteDisabled"
			option-group-label="label"
			option-group-children="items"
			class="original-search"
			empty-search-message="Оригиналов по запросу не найдено"
			label-text="Поиск трека по базе и на платформах"
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
	</div>
</template>

<style></style>
