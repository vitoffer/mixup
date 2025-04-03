<script setup lang="ts">
import { OriginalTrack, Track } from "@/types"
import {
	AutoCompleteCompleteEvent,
	AutoCompleteOptionSelectEvent,
} from "primevue"
import AddedOriginalTracksList from "./AddedOriginalTracksList.vue"
import { ref } from "vue"
import TrackItem from "../TrackItem.vue"

defineProps<{
	originalTracksSuggestions: (Track | { splitter: boolean; text: string })[]
}>()

defineEmits<{
	searchOriginalTrack: [event: AutoCompleteCompleteEvent]
	createOriginal: []
}>()

const originalTracksList = defineModel<OriginalTrack[]>("originalTracksList")
const originalTracksSearchInputRounded = defineModel<boolean>(
	"originalTracksSearchInputRounded",
)

const originalTracksSearch = ref("")

function deleteOriginalTrack(title: string) {
	originalTracksList.value = originalTracksList.value?.filter(
		(track) => track.title !== title,
	)
}

function selectOriginalTrack(event: AutoCompleteOptionSelectEvent) {
	if (
		originalTracksList.value?.find(
			(track) => track.title === event.value.title,
		) === undefined
	) {
		originalTracksList.value?.push(event.value)
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
			<AutoComplete
				v-model="originalTracksSearch"
				:suggestions="originalTracksSuggestions"
				@complete="(event) => $emit('searchOriginalTrack', event)"
				@option-select="selectOriginalTrack"
				@show="originalTracksSearchInputRounded = false"
				@hide="originalTracksSearchInputRounded = true"
				:input-class="[
					{ '!rounded-b-none': !originalTracksSearchInputRounded },
					'placeholder:text-cyan-700',
				]"
				empty-search-message="Оригиналов по запросу не найдено"
				append-to="self"
				class="original-search w-full"
				input-id="searchOriginal"
				@blur="hideFloatLabel"
			>
				<template #option="slotProps">
					<p
						v-if="slotProps.option.splitter"
						class="py-1 text-yellow-700"
					>
						{{ slotProps.option.text }}
					</p>
					<TrackItem
						v-else
						:track="slotProps.option"
						:with-links="false"
						unbordered
					/>
				</template>
				<template #footer>
					<div class="mt-1 flex flex-col items-center leading-[1.25rem]">
						<p class="text-cyan-700">Не нашли, что искали?</p>
						<button
							class="text-yellow-700"
							@click="$emit('createOriginal')"
						>
							Добавьте трек сами!
						</button>
					</div>
					<div class="spacer absolute -bottom-4 left-0 h-6 w-full"></div>
				</template>
			</AutoComplete>
			<label for="searchOriginal">Поиск трека по базе и на youtube music</label>
		</FloatLabel>
	</div>
</template>

<style>
@reference "../../assets/styles/main.css";

.original-search {
	@apply mt-0;

	.p-autocomplete-option {
		@apply first:mt-[1px];
	}

	.p-autocomplete-list {
		@apply border-y border-y-gray-700 pb-2;
	}

	.p-autocomplete-empty-message {
		@apply mt-2;
	}
}
</style>
