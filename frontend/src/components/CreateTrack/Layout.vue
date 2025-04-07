<script setup lang="ts">
import { useSavedInfo } from "@/composables/createTrack/savedInfo"
import { useMixEditStore } from "@/stores/mixEditStore"
import { useToastStore } from "@/stores/toastStore"
import { Platform, Track } from "@/types"
import { useConfirm } from "primevue"
import { onMounted } from "vue"
import { onBeforeRouteLeave, useRouter } from "vue-router"
import TagsEdit from "./TagsEdit.vue"
import BaseInfoEdit from "./BaseInfoEdit.vue"
import PlatformTabList from "./PlatformTabList.vue"
import PlatformTrackSearch from "./PlatformTrackSearch.vue"

const props = withDefaults(
	defineProps<{
		isMix?: boolean
		headerText: string
		successMessage: string
	}>(),
	{
		isMix: false,
	},
)

const confirm = useConfirm()
const router = useRouter()
const mixEditStore = useMixEditStore()
const toastStore = useToastStore()

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

function updateOriginalTracksList(newValue: Track[]) {
	originalTracks.value = newValue
}

async function navigateToCreateOriginal() {
	mixEditStore.mix = {
		title: title.value,
		artistsNames: artistsNames.value,
		tags: tags.value,
		savedLinks: savedLinks.value,
		originalTracks: originalTracks.value,
	}
	router.push({ name: "createOriginal" })
}

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

onMounted(() => {
	const savedState = mixEditStore.mix
	if (props.isMix && savedState) {
		title.value = savedState.title
		artistsNames.value = savedState.artistsNames
		tags.value = savedState.tags
		savedLinks.value = savedState.savedLinks
		originalTracks.value = savedState.originalTracks
	}
})

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
				<PlatformTrackSearch
					input-id="foundTrack"
					v-model:search-model="trackFoundOnPlatform"
					:suggestions="platformTrackSuggestions[currentPlatform]"
					@search-track="searchTrackOnPlatform($event, currentPlatform)"
					@select-track="selectFoundTrackOnPlatform($event, currentPlatform)"
					dropdown
					class="platform-search"
					empty-search-message="Треков не найдено"
					@change="changeText"
					:option-label="
						(track) => `${track.title} - ${track.artistsNames.join(', ')}`
					"
				/>
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
		<slot
			name="additionalInfo"
			:original-tracks="originalTracks"
			:create-original="navigateToCreateOriginal"
			:update-original-tracks-list="updateOriginalTracksList"
		></slot>
		<button
			class="flex cursor-pointer items-center justify-center rounded-[10px] bg-yellow-800 px-16 py-4 text-2xl leading-none font-bold text-gray-900"
			@click="saveTrack(isMix, successMessage)"
		>
			OK
		</button>
	</div>
</template>

<style>
@reference "../../assets/styles/main.css";

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
</style>
