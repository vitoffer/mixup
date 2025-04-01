<script setup lang="ts">
import { Platform } from "@/types"
import { AutoCompleteCompleteEvent, useConfirm } from "primevue"
import PlatformTabList from "@/components/CreateTrack/PlatformTabList.vue"
import BaseInfoEdit from "@/components/CreateTrack/BaseInfoEdit.vue"
import TagsEdit from "@/components/CreateTrack/TagsEdit.vue"
import OriginalsEdit from "@/components/CreateTrack/OriginalsEdit.vue"
import { useSavedInfo } from "@/composables/createTrack/savedInfo"
import { useOriginalTracks } from "@/composables/createTrack/originalTracks"
import { onBeforeRouteLeave, useRouter } from "vue-router"
import { onMounted } from "vue"
import { useMixEditStore } from "@/stores/mixEditStore"
import { useToastStore } from "@/stores/toastStore"

const confirm = useConfirm()
const router = useRouter()
const toastStore = useToastStore()

const mixEditStore = useMixEditStore()

function navigateToCreateOriginal() {
	mixEditStore.mix = {
		title: title.value,
		artistsNames: artistsNames.value,
		tags: tags.value,
		savedLinks: savedLinks.value,
		originalTracks: originalTracks.value,
	}

	router.push({ name: "createOriginal" })
}

onMounted(() => {
	const savedState = mixEditStore.mix
	if (savedState) {
		title.value = savedState.title
		artistsNames.value = savedState.artistsNames
		tags.value = savedState.tags
		savedLinks.value = savedState.savedLinks
		originalTracks.value = savedState.originalTracks
	}
})

const {
	savedLinks,
	currentPlatform,
	title,
	artistsNames,
	tags,
	addTag,
	removeTag,
	originalTracks,
	clearSavedLink,
	platformTrackSuggestions,
	searchTrackOnPlatformRounded,
	trackFoundOnPlatform,
	iconStates,
	searchTrackOnPlatform,
	saveTrack,
	selectFoundTrackOnPlatform,
	changeText,
} = useSavedInfo()

const {
	originalTracksSearchInputRounded,
	originalTracksSuggestions,
	searchOriginalTrack,
} = useOriginalTracks()

function confirmClearSavedLink(event: Event, platform: Platform) {
	confirm.require({
		target: event.currentTarget as HTMLElement,
		message: "Точно удалить эту ссылку?",
		icon: "pi pi=exclamation-triangle",
		rejectProps: {
			label: "Отмена",
		},
		acceptProps: {
			label: "Удалить",
		},
		accept: () => {
			clearSavedLink(platform)
		},
	})
}

async function localSaveTrack() {
	await saveTrack()

	toastStore.addToast({ summary: "Микс успешно создан" })

	router.push({ name: "trackList" })
}

onBeforeRouteLeave((to) => {
	if (to.name !== "createMix" && to.name !== "createOriginal") {
		mixEditStore.clearMix()
	}
})
</script>

<template>
	<ConfirmPopup />
	<div class="flex flex-col items-center gap-5">
		<h1 class="text-xl font-bold text-yellow-900">Добавление микса</h1>
		<div class="flex w-full flex-col gap-3">
			<FloatLabel variant="in">
				<AutoComplete
					v-model="trackFoundOnPlatform"
					:suggestions="platformTrackSuggestions[currentPlatform]"
					@complete="searchTrackOnPlatform($event, currentPlatform)"
					input-class="placeholder:text-cyan-800"
					input-id="foundTrack"
					:class="{ '!rounded-b-none': !searchTrackOnPlatformRounded }"
					@change="changeText"
					@show="searchTrackOnPlatformRounded = false"
					@hide="searchTrackOnPlatformRounded = true"
					@option-select="selectFoundTrackOnPlatform($event, currentPlatform)"
					empty-search-message="Треков не найдено"
					append-to="self"
					:option-label="
						(track) => `${track.title} - ${track.artistsNames.join(', ')}`
					"
					class="platform-search w-full"
					dropdown
				>
					<template #option="{ option }">
						<p>
							{{ option.title }}
							-
							{{ option.artistsNames.join(", ") }}
						</p>
					</template>
				</AutoComplete>
				<label for="foundTrack">Поиск трека на площадке</label>
			</FloatLabel>
			<PlatformTabList
				v-model:current-platform="currentPlatform"
				v-model:icon-states="iconStates"
				v-model:saved-links="savedLinks"
				@clear-link="confirmClearSavedLink"
			/>
		</div>
		<BaseInfoEdit
			v-model:title="title"
			v-model:artists-names="artistsNames"
		/>
		<TagsEdit
			:tags="tags"
			@add-tag="addTag"
			@remove-tag="removeTag"
		/>
		<OriginalsEdit
			:original-tracks-suggestions="originalTracksSuggestions"
			v-model:original-tracks-list="originalTracks"
			v-model:original-tracks-search-input-rounded="
				originalTracksSearchInputRounded
			"
			@search-original-track="searchOriginalTrack"
			@create-original="navigateToCreateOriginal"
		/>
		<button
			class="flex cursor-pointer items-center justify-center rounded-[10px] bg-yellow-800 px-16 py-4 text-2xl leading-none font-bold text-gray-900"
			@click="localSaveTrack"
		>
			OK
		</button>
	</div>
</template>

<style>
@reference "../assets/styles/main.css";

.p-confirmpopup {
	@apply absolute top-0 left-0 mt-[10px] rounded-md border border-gray-600 bg-gray-800 p-2 text-cyan-700 before:pointer-events-none before:absolute before:bottom-full before:left-5 before:-ms-[10px] before:h-0 before:w-0 before:border-[10px] before:border-transparent before:border-b-gray-600 after:pointer-events-none after:absolute after:bottom-full after:left-5 after:-ms-[8px] after:h-0 after:w-0 after:border-[8px] after:border-transparent after:border-b-gray-800;
}

.p-confirmpopup-content {
	@apply mb-2;
}

.p-confirmpopup-reject-button {
	@apply cursor-pointer rounded-lg border border-cyan-700 px-3 py-2;
}

.p-confirmpopup-accept-button {
	@apply cursor-pointer rounded-lg bg-red-900 px-3 py-2 text-gray-900;
}

.p-confirmpopup-footer {
	@apply flex gap-2;
}

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
</style>
