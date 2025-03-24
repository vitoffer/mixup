<script setup lang="ts">
import { ref } from "vue"
import youtubeMusicIcon from "../assets/icons/youtube_logo.svg?url"
import spotifyIcon from "../assets/icons/spotify_logo.svg?url"
import yandexMusicIcon from "../assets/icons/yandex_logo.svg?url"
import { trackList } from "@/storage/storage"
import { OriginalTrack, Platform } from "@/types"
import markIcon from "../assets/icons/mark.svg?url"
import crossIcon from "../assets/icons/cross.svg?url"
import { AutoCompleteCompleteEvent, useConfirm } from "primevue"
import TrackItem from "@/components/TrackItem.vue"
import axios from "axios"

const confirm = useConfirm()

const tabs = [
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

const iconStates = ref<Record<string, string>>({})
tabs.forEach((tab) => {
	iconStates.value[tab.platform] = markIcon
})

const savedLinks = ref({
	youtubeMusic: "",
	spotify: "",
	yandexMusic: "",
})
const title = ref<string>("")
const artistsNames = ref<string>("")
const tags = ref<string[]>([])
const originalTracks = ref<OriginalTrack[]>([])

function clearSavedLink(platform: Platform) {
	savedLinks.value[platform] = ""
	iconStates.value[platform] = markIcon
}

function addTag(event: Event) {
	const target = event.target as HTMLInputElement
	if (target.value.trim() && !tags.value.includes(target.value.trim())) {
		tags.value.push(target.value.trim())
	}
	target.value = ""
}

async function removeTag(tag: string) {
	tags.value = tags.value.filter((filteringTag) => filteringTag !== tag)
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

const originalTracksSuggestions = ref<OriginalTrack[]>([])

function searchOriginalTrack(event: AutoCompleteCompleteEvent) {
	originalTracksSuggestions.value = trackList.value.filter((track) => {
		return (
			!track.isMix &&
			track.title.toLowerCase().includes(event.query.toLowerCase())
		)
	})
}

const originalTracksSearchInputRounded = ref(true)

async function saveTrack() {
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
}
</script>

<template>
	<ConfirmPopup />
	<div class="flex flex-col items-center gap-5">
		<h1 class="text-xl font-bold text-yellow-900">Добавление микса</h1>
		<Tabs value="youtubeMusic">
			<TabList>
				<Tab
					v-for="(tab, index) in tabs"
					:key="tab.platform"
					:value="tab.platform"
					class="flex gap-1.5"
				>
					<img
						:src="tab.icon"
						alt="Лого платформы"
						class="max-h-[36px] w-[38px]"
					/>
					<div
						v-if="!savedLinks[tab.platform as keyof typeof savedLinks]"
						class="flex aspect-square w-6 items-center justify-center after:block after:aspect-square after:w-2 after:rounded-full after:bg-cyan-700"
					></div>
					<img
						v-else
						:src="iconStates[tab.platform]"
						alt="Индикатор заполненности ссылки на платформу"
						class="cursor-pointer"
						@click.prevent="
							confirmClearSavedLink($event, tab.platform as Platform)
						"
						@mouseenter="iconStates[tab.platform] = crossIcon"
						@mouseleave="iconStates[tab.platform] = markIcon"
					/>
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel
					v-for="(tab, index) in tabs"
					:key="tab.platform"
					:value="tab.platform"
				>
					<input
						type="text"
						v-model="savedLinks[tab.platform as keyof typeof savedLinks]"
						:placeholder="tab.placeholder"
						class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
					/>
				</TabPanel>
			</TabPanels>
		</Tabs>
		<div class="flex w-full flex-col gap-3">
			<input
				type="text"
				placeholder="Редактировать название"
				class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
				v-model="title"
			/>
			<input
				type="text"
				placeholder="Редактировать автора(-ов через запятую)"
				class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
				v-model="artistsNames"
			/>
		</div>
		<div class="flex w-full flex-col gap-2">
			<p class="text-bold mb-1 text-lg leading-none text-yellow-700">Теги:</p>
			<ul
				v-if="tags.length"
				class="flex flex-wrap gap-1"
			>
				<li v-for="tag in tags">
					<div
						class="flex items-center justify-center gap-1.5 rounded-full bg-gray-800 px-3 py-2.5 text-cyan-700"
					>
						<span>{{ tag }}</span>
						<button
							@click="removeTag(tag)"
							class="cursor-pointer"
						>
							<span class="hidden">Удалить тег</span>
							<i class="pi pi-times"></i>
						</button>
					</div>
				</li>
			</ul>
			<p
				v-else
				class="text-[0.875rem] text-cyan-700"
			>
				Пусто... Добавьте первый тег (если нужно) ниже
			</p>
			<input
				type="text"
				placeholder="+ Тег"
				class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
				@change="addTag"
			/>
		</div>
		<div class="flex w-full flex-col gap-2">
			<p class="text-bold mb-1 text-lg leading-none text-yellow-700">
				Оригиналы:
			</p>
			<AutoComplete
				v-model="originalTracks"
				placeholder="Поиск трека по базе"
				multiple
				:suggestions="originalTracksSuggestions"
				@complete="searchOriginalTrack"
				@show="originalTracksSearchInputRounded = false"
				@hide="originalTracksSearchInputRounded = true"
				:input-class="{ '!rounded-b-none': !originalTracksSearchInputRounded }"
				empty-search-message="Оригиналов по запросу не найдено"
				append-to="self"
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
					<TrackItem
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
				</template>
			</AutoComplete>
		</div>
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

.p-tabs {
	@apply flex w-full flex-col gap-3;
}

.p-tablist-content {
	@apply flex justify-center;
}

.p-tablist-tab-list {
	@apply flex w-fit gap-1;
}

.p-tab {
	@apply flex items-center justify-center bg-gray-800 p-2 first:rounded-l-[10px] last-of-type:rounded-r-[10px];
}

.p-tab-active {
	@apply bg-gray-700;
}

.p-tablist-active-bar {
	@apply hidden;
}

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

.p-autocomplete-input-multiple {
	@apply flex flex-col;
}

.p-autocomplete-chip-item {
	@apply not-first:-translate-y-[1px];
}

.p-autocomplete-input-chip {
	@apply mt-3;

	input {
		@apply w-full px-3 py-2.5 text-cyan-700;
	}
}

.p-autocomplete-overlay {
	@apply w-full rounded-b-[10px] bg-gray-800 px-3 pb-2.5;
}

.p-autocomplete-list {
	@apply border-y border-y-gray-700 pb-2;
}

.p-autocomplete-empty-message {
	@apply mt-2;
}
</style>
