<script setup lang="ts">
import { nextTick, ref } from "vue"
import youtubeMusicIcon from "../assets/icons/youtube_logo.svg?url"
import spotifyIcon from "../assets/icons/spotify_logo.svg?url"
import yandexMusicIcon from "../assets/icons/yandex_logo.svg?url"
import { trackList } from "@/storage/storage"
import { CreateTrackPlatformTab, OriginalTrack, Platform } from "@/types"
import markIcon from "../assets/icons/mark.svg?url"
import {
	AutoCompleteChangeEvent,
	AutoCompleteCompleteEvent,
	useConfirm,
} from "primevue"
import TrackItem from "@/components/TrackItem.vue"
import axios from "axios"
import { useToastStore } from "@/stores/toastStore"
import PlatformTabList from "@/components/CreateTrack/PlatformTabList.vue"

const toastStore = useToastStore()
const confirm = useConfirm()

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

const iconStates = ref<Record<Platform, string>>({
	youtubeMusic: markIcon,
	spotify: markIcon,
	yandexMusic: markIcon,
})

const currentPlatform = ref<Platform>("youtubeMusic")

const trackFoundOnPlatform = ref<object | string>({})
const searchPlatformText = ref<string>("")
const platformTrackSuggestions = ref<Record<Platform, object[]>>({
	youtubeMusic: [{}],
	yandexMusic: [{}],
	spotify: [{}],
})
const searchTrackOnPlatformRounded = ref(true)

const savedLinks = ref({
	youtubeMusic: "",
	spotify: "",
	yandexMusic: "",
})

const title = ref<string>("")
const artistsNames = ref<string>("")

const tags = ref<string[]>([])
const inputTagText = ref<string>("")

const originalTracks = ref<OriginalTrack[]>([])
const originalTracksSuggestions = ref<OriginalTrack[]>([])
const originalTracksSearchInputRounded = ref(true)

function clearSavedLink(platform: Platform) {
	savedLinks.value[platform] = ""
	iconStates.value[platform] = markIcon

	if (Object.values(savedLinks.value).every((link) => link.length === 0)) {
		title.value = ""
		artistsNames.value = ""
		trackFoundOnPlatform.value = ""
		searchPlatformText.value = ""
	}

	;(
		document.querySelector(".platform-search .p-inputtext") as HTMLInputElement
	).classList.remove("p-filled")
}

function addTag() {
	if (
		inputTagText.value.trim() &&
		!tags.value.includes(inputTagText.value.trim())
	) {
		tags.value.push(inputTagText.value.trim())
	}
	inputTagText.value = ""
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

function searchOriginalTrack(event: AutoCompleteCompleteEvent) {
	originalTracksSuggestions.value = trackList.value.filter((track) => {
		return (
			!track.isMix &&
			track.title.toLowerCase().includes(event.query.toLowerCase())
		)
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

async function searchTrackOnPlatform(
	event: AutoCompleteCompleteEvent,
	platform: Platform,
) {
	if (!event.query && !searchPlatformText.value) {
		platformTrackSuggestions.value[platform] = []
		return
	}

	const formattedPlatform = {
		youtubeMusic: "youtube",
		yandexMusic: "yandex",
		spotify: "spotify",
	}[platform]

	setTimeout(async () => {
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_BASE_API_URL}/search/${formattedPlatform}`,
				{
					params: {
						q: event.query || searchPlatformText.value,
					},
				},
			)

			platformTrackSuggestions.value[platform] = data.slice(0, 5)
		} catch (e) {
			toastStore.addToast({ detail: JSON.stringify(e) })
		}
	}, 250)
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
				v-model:current-platform="currentPlatform"
				:icon-states="iconStates"
				:saved-links="savedLinks"
				:tabs="tabs"
				@clear-link="confirmClearSavedLink"
			/>
		</div>
		<div class="flex w-full flex-col gap-3">
			<FloatLabel variant="in">
				<InputText
					type="text"
					placeholder=""
					class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
					v-model="title"
					id="editTitle"
				></InputText>
				<label for="editTitle">Редактировать название</label>
			</FloatLabel>
			<FloatLabel variant="in">
				<InputText
					type="text"
					class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
					v-model="artistsNames"
					id="editArtists"
				></InputText>
				<label for="editArtists">Редактировать автора(-ов) через запятую</label>
			</FloatLabel>
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
				Пока нет тегов. Добавьте первый (если нужно) ниже
			</p>
			<div class="flex gap-2 rounded-[10px] bg-gray-800">
				<FloatLabel
					variant="in"
					class="w-full"
				>
					<InputText
						type="text"
						placeholder=""
						class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
						@change="addTag"
						v-model="inputTagText"
						id="addTag"
					></InputText>
					<label for="addTag">Тег</label>
				</FloatLabel>
				<button
					class="rounded-r-[10px] bg-green-900 px-2.5 text-2xl leading-0 text-gray-900"
					@click="addTag"
				>
					+
				</button>
			</div>
		</div>
		<div class="flex w-full flex-col gap-2">
			<p class="text-bold mb-1 text-lg leading-none text-yellow-700">
				Оригиналы:
			</p>
			<p
				v-if="originalTracks.length === 0"
				class="text-[0.875rem] text-cyan-700"
			>
				Пока нет оригиналов. Добавьте первый (если нужно) ниже
			</p>
			<AutoComplete
				v-model="originalTracks"
				placeholder="Поиск трека по базе"
				multiple
				:suggestions="originalTracksSuggestions"
				@complete="searchOriginalTrack"
				@show="originalTracksSearchInputRounded = false"
				@hide="originalTracksSearchInputRounded = true"
				:input-class="[
					{ '!rounded-b-none': !originalTracksSearchInputRounded },
					'placeholder:text-cyan-800',
				]"
				empty-search-message="Оригиналов по запросу не найдено"
				append-to="self"
				class="original-search w-full"
				:pt:inputchip:class="originalTracks.length > 0 ? 'mt-3' : 'mt-0'"
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
					<div class="spacer absolute -bottom-4 left-0 h-6 w-full"></div>
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

.p-floatlabel {
	@apply relative block;
}

.p-floatlabel label {
	@apply pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 leading-none transition-all duration-200 ease-out;
}

.p-floatlabel:has(.p-inputtext) label {
	@apply top-5 translate-y-0;
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(.p-inputwrapper-focus) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
	@apply -top-5 translate-y-0 text-xs font-normal;
}

.p-floatlabel-in .p-inputtext,
.p-floatlabel-in .p-autocomplete-input-multiple {
	@apply pt-6 pb-2;
}

.p-floatlabel-in:has(input:focus) label,
.p-floatlabel-in:has(input.p-filled) label,
.p-floatlabel-in:has(input:-webkit-autofill) label,
.p-floatlabel-in:has(.p-inputwrapper-focus) label,
.p-floatlabel-in:has(.p-inputwrapper-filled) label {
	@apply top-2;
}

.p-floatlabel-on:has(input:focus) label,
.p-floatlabel-on:has(input.p-filled) label,
.p-floatlabel-on:has(input:-webkit-autofill) label,
.p-floatlabel-on:has(.p-inputwrapper-focus) label,
.p-floatlabel-on:has(.p-inputwrapper-filled) label {
	@apply top-0 -translate-y-1/2 rounded-sm px-[0.125rem] py-0;
}
</style>
