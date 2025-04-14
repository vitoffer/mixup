<script setup lang="ts">
import { Track, TrackPlatformSearchResult } from "@/types"
import {
	AutoCompleteChangeEvent,
	AutoCompleteCompleteEvent,
	AutoCompleteOptionSelectEvent,
} from "primevue"
import { ref } from "vue"

defineOptions({
	inheritAttrs: false,
})

const props = withDefaults(
	defineProps<{
		suggestions: (
			| Track
			| { splitter: boolean; text: string }
			| TrackPlatformSearchResult
		)[]
		inputId: string
		disabled?: boolean
		dropdown?: boolean
		emptySearchMessage: string
		optionLabel?: string | ((data: any) => string)
		labelText: string
		optionGroupLabel?: string
		optionGroupChildren?: string
	}>(),
	{
		disabled: false,
		dropdown: false,
	},
)

const searchModel = defineModel<string>("searchModel")

defineEmits<{
	searchTrack: [event: AutoCompleteCompleteEvent]
	selectTrack: [event: AutoCompleteOptionSelectEvent]
	change: [event: AutoCompleteChangeEvent]
}>()

const searchTrackRounded = ref(true)

function handleFocus(event: Event) {
	const autocompleteElem = (event.target as HTMLInputElement).closest(
		".p-autocomplete",
	)
	if (autocompleteElem) {
		autocompleteElem.scrollIntoView({
			behavior: "smooth",
		})
	}
}

async function hideFloatLabel() {
	const inputElem = document.querySelector(
		`#${props.inputId}`,
	) as HTMLInputElement
	inputElem.classList.remove("p-filled")
}
</script>

<template>
	<FloatLabel variant="in">
		<Autocomplete
			v-model="searchModel"
			:disabled
			:dropdown
			:suggestions="suggestions"
			:class="$attrs.class"
			:option-label
			:option-group-label
			:option-group-children
			:empty-search-message
			:input-id="inputId"
			:input-class="[
				{ '!rounded-b-none': !searchTrackRounded },
				'placeholder:text-cyan-700',
			]"
			append-to="self"
			class="w-full"
			@complete="$emit('searchTrack', $event)"
			@change="$emit('change', $event)"
			@option-select="$emit('selectTrack', $event)"
			@show="searchTrackRounded = false"
			@hide="searchTrackRounded = true"
			@focus="handleFocus"
			@blur="hideFloatLabel"
		>
			<template #option="{ option }">
				<TrackItem
					:track="option"
					:with-links="false"
					unbordered
				/>
			</template>
			<template #footer>
				<slot name="footer" />
			</template>
		</Autocomplete>
		<label :for="inputId">{{ labelText }}</label>
	</FloatLabel>
</template>

<style>
@reference "../../assets/styles/main.css";

.p-autocomplete-list-container {
	@apply overflow-y-auto;
}

.platform-search {
	@apply flex items-center rounded-[10px] bg-gray-800;

	.p-autocomplete-option {
		@apply border-b-gray-700 py-1 leading-5 not-last:border-b;
	}

	.p-autocomplete-input {
		@apply min-w-[24ch];
	}

	.p-autocomplete-dropdown {
		@apply block aspect-square p-2 leading-3;
	}
}

.p-autocomplete {
	input {
		@apply w-full px-3 py-2.5 text-cyan-700;
	}

	.p-autocomplete-overlay {
		@apply !top-full w-full rounded-b-[10px] bg-gray-800 px-3 pb-2.5 shadow-lg;
	}
}

.original-search {
	@apply mt-0;

	.p-autocomplete-overlay {
		@apply relative! max-w-[400px];
	}

	.p-autocomplete-loader {
		@apply absolute top-[27px] right-4 z-10 -translate-y-1/2;
	}

	.p-autocomplete-option {
		@apply first:mt-[1px];
	}

	.p-autocomplete-option-group {
		@apply py-1;
	}

	.p-autocomplete-list {
		@apply border-y border-y-gray-700 pb-2;
	}

	.p-autocomplete-empty-message {
		@apply mt-2;
	}
}
</style>
