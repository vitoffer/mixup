<script setup lang="ts">
import { OriginalTrack, Track } from "@/types"
import { AutoCompleteCompleteEvent } from "primevue"

defineProps<{
	originalTracksSuggestions: (Track | { splitter: boolean; text: string })[]
}>()

defineEmits<{
	searchOriginalTrack: [event: AutoCompleteCompleteEvent]
}>()

const originalTracksList = defineModel<OriginalTrack[]>("originalTracksList")
const originalTracksSearchInputRounded = defineModel<boolean>(
	"originalTracksSearchInputRounded",
)
</script>

<template>
	<div class="flex w-full flex-col gap-2">
		<p class="text-bold mb-1 text-lg leading-none text-yellow-700">
			Оригиналы:
		</p>
		<p
			v-if="originalTracksList!.length === 0"
			class="text-[0.875rem] text-cyan-700"
		>
			Пока нет оригиналов. Добавьте первый (если нужно) ниже
		</p>
		<AutoComplete
			v-model="originalTracksList"
			placeholder="Поиск трека по базе"
			multiple
			:suggestions="originalTracksSuggestions"
			@complete="(event) => $emit('searchOriginalTrack', event)"
			@show="originalTracksSearchInputRounded = false"
			@hide="originalTracksSearchInputRounded = true"
			:input-class="[
				{ '!rounded-b-none': !originalTracksSearchInputRounded },
				'placeholder:text-cyan-800',
			]"
			empty-search-message="Оригиналов по запросу не найдено"
			append-to="self"
			class="original-search w-full"
			:pt:inputchip:class="originalTracksList!.length > 0 ? 'mt-3' : 'mt-0'"
		>
			<template #chip="slotProps">
				<div class="relative">
					<TrackItem
						:track="slotProps.value"
						:with-links="false"
					/>
					<button
						class="absolute top-1/2 right-2 flex aspect-square -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-gray-800 p-2 text-red-900"
						@click="slotProps.removeCallback"
					>
						<span class="hidden">Удалить оригинальный трек</span>
						<i class="pi pi-times leading-none"></i>
					</button>
				</div>
			</template>
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
					<a
						class="text-yellow-700"
						href="/create-original"
					>
						Добавьте трек сами!
					</a>
				</div>
				<div class="spacer absolute -bottom-4 left-0 h-6 w-full"></div>
			</template>
		</AutoComplete>
	</div>
</template>

<style>
@reference "../../assets/styles/main.css";

.original-search {
	@apply mt-0;

	.p-autocomplete-input-multiple {
		@apply flex flex-col;
	}

	.p-autocomplete-chip-item {
		@apply not-first:-translate-y-[1px];
	}

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
