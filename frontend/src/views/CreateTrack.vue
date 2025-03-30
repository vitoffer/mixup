<script setup lang="ts">
import { nextTick } from "vue"
import youtubeMusicIcon from "../assets/icons/youtube_logo.svg?url"
import spotifyIcon from "../assets/icons/spotify_logo.svg?url"
import yandexMusicIcon from "../assets/icons/yandex_logo.svg?url"
import { trackList } from "@/storage/storage"
import { CreateTrackPlatformTab, Platform } from "@/types"
import {
	AutoCompleteChangeEvent,
	AutoCompleteCompleteEvent,
	useConfirm,
} from "primevue"
import axios from "axios"
import { useToastStore } from "@/stores/toastStore"
import PlatformTabList from "@/components/CreateTrack/PlatformTabList.vue"
import BaseInfoEdit from "@/components/CreateTrack/BaseInfoEdit.vue"
import TagsEdit from "@/components/CreateTrack/TagsEdit.vue"
import OriginalsEdit from "@/components/CreateTrack/OriginalsEdit.vue"
import { useSavedInfo } from "@/composables/createTrack/savedInfo"
import { useOriginalTracks } from "@/composables/createTrack/originalTracks"

const toastStore = useToastStore()
const confirm = useConfirm()

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
	searchPlatformText,
	searchTrackOnPlatformRounded,
	trackFoundOnPlatform,
	iconStates,
	searchTrackOnPlatform,
} = useSavedInfo()

const {
	originalTracksSearchInputRounded,
	originalTracksSuggestions,
	searchOriginalTrack,
} = useOriginalTracks(trackList.value)

const tabs: CreateTrackPlatformTab[] = [
	{
		platform: "youtubeMusic",
		link: "",
		icon: youtubeMusicIcon,
		placeholder: "Ссылка на youtube",
	},
	{
		platform: "spotify",
		link: "",
		icon: spotifyIcon,
		placeholder: "Ссылка на spotify",
	},
	{
		platform: "yandexMusic",
		link: "",
		icon: yandexMusicIcon,
		placeholder: "Ссылка на яндекс музыку",
	},
]

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

async function saveTrack() {
	try {
		const { data, status } = await axios.post(
			`${import.meta.env.VITE_BASE_API_URL}/tracks`,
			{
				title: title.value,
				urls: {
					youtubeMusic: savedLinks.value.youtubeMusic || null,
					yandexMusic: savedLinks.value.yandexMusic || null,
					spotify: savedLinks.value.spotify || null,
				},
				artistsNames: artistsNames.value.split(", "),
				tags: tags.value,
				mixedTracks: originalTracks.value.map((track) => track.id),
			},
		)

		console.log(status, data)
	} catch (e) {
		toastStore.addToast({
			detail: (e as any).response.data.error.issues
				.map((issue: { message: string }) => issue.message)
				.join("\n"),
		})
	}
}

async function selectFoundTrackOnPlatform(
	event: AutoCompleteChangeEvent,
	platform: Platform,
) {
	const allLinksEmpty =
		Object.keys(savedLinks.value).filter(
			(key) => key !== platform && savedLinks.value[key as Platform],
		).length === 0

	if (!title.value || allLinksEmpty) {
		title.value = event.value.title
	}

	if (artistsNames.value.length === 0 || allLinksEmpty) {
		artistsNames.value = event.value.artistsNames.join(", ")
	}

	savedLinks.value[platform] = event.value.url

	await nextTick()
	trackFoundOnPlatform.value = searchPlatformText.value
}

function changeText(event: AutoCompleteChangeEvent) {
	if (typeof event.value === "object") {
		return
	}
	searchPlatformText.value = event.value
}
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
				:tabs="tabs"
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
		/>
		<button
			class="flex cursor-pointer items-center justify-center rounded-[10px] bg-yellow-800 px-16 py-4 text-2xl leading-none font-bold text-gray-900"
			@click="saveTrack"
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
