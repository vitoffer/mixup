<script setup>
import { ref } from "vue"
import AutoComplete from "primevue/autocomplete"
import BaseLayout from "@/components/BaseLayout.vue"
import { trackList } from "@/storage/storage"
import MixedTrackForNewMix from "../components/MixedTrackForNewMix.vue"
import Chip from "primevue/chip"
import { filterTracks } from "@/modules/trackList"
import {
	selectedTrackIdByPlatform,
	selectedTrackVkLink,
} from "@/modules/createMix"
import { foundTrackListByPlatform } from "../modules/createMix"

const filteredTrackList = ref([])
const selectedMixedTracksForNewMix = ref([])

function search(event) {
	if (!event.query.trim().length) {
		filteredTrackList.value = [...trackList]
	} else {
		filteredTrackList.value = filterTracks(trackList, event.query)
	}
}

async function createMix() {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/add-track/by-platforms`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				youtube: foundTrackListByPlatform.value.youtube.find(
					(track) => track.id === selectedTrackIdByPlatform.youtube,
				),
				spotify: foundTrackListByPlatform.value.spotify.find(
					(track) => track.id === selectedTrackIdByPlatform.spotify,
				),
				yandex: foundTrackListByPlatform.value.yandex.find(
					(track) => track.id === selectedTrackIdByPlatform.yandex,
				),
				vkLink: selectedTrackVkLink.value,
				mixedTrackIds: selectedMixedTracksForNewMix.value.map(
					(track) => track._id,
				),
			}),
		},
	)

	const result = await response.json()
}
</script>

<template>
	<BaseLayout class="create-mix">
		<h3 class="create-mix__title">Форма добавления микса</h3>
		<p class="create-mix__text">
			Выберите mixed треки для добавленного трека (если они есть) из
			представленных на сайте
		</p>
		<div id="selectSection">
			<AutoComplete
				ref="multiSelect"
				v-model="selectedMixedTracksForNewMix"
				:suggestions="filteredTrackList"
				:option-label="
					(option) => `${option.name} ${option.authors.join(', ')}`
				"
				multiple
				filter
				force-selection
				placeholder="> Поиск mixed треков на сайте"
				@complete="search"
				inputClass="p-autocomplete-input-elem"
			>
				<template #chip="{ value, removeCallback }">
					<Chip removable>
						<template #default>
							<MixedTrackForNewMix :track="value" />
						</template>
						<template #removeicon>
							<i
								class="pi pi-times remove-icon"
								@click="removeCallback"
							></i>
						</template>
					</Chip>
				</template>
				<template #option="{ option }">
					<MixedTrackForNewMix :track="option" />
				</template>
			</AutoComplete>
		</div>

		<button
			class="create-mix__button button--complete"
			@click="createMix"
		>
			Добавить
		</button>
	</BaseLayout>
</template>

<style>
.p-autocomplete {
	display: flex !important;
	width: 600px !important;
	margin: 0 auto !important;
}
.p-autocomplete-input-multiple {
	display: flex !important;
	flex-direction: column !important;
	gap: 0 !important;
	background-color: transparent !important;
	border: none !important;
}

.p-autocomplete-input-chip {
	width: 100% !important;
	padding: 0 !important;
	border-block: solid 1px var(--gray-700);
}

.p-autocomplete-chip-item {
	width: 100% !important;
	border-top: solid 1px var(--gray-700);
}

.p-autocomplete-input-elem {
	padding: 22px 0 22px 16px !important;
	color: var(--yellow-900) !important;
}

.p-autocomplete-input-elem::placeholder {
	color: var(--yellow-800) !important;
}

.p-chip {
	width: 100% !important;
	background-color: transparent !important;
}

.p-autocomplete-overlay {
	background-color: var(--gray-900) !important;
	border: none !important;
	border-radius: 0 !important;
	box-shadow: none !important;
}

.p-autocomplete-option {
	border-top: solid 1px var(--gray-700) !important;
}

.p-autocomplete-option:last-child {
	border-bottom: solid 1px var(--gray-700) !important;
}

.p-autocomplete-option:hover {
	background-color: var(--gray-700) !important;
}

.p-autocomplete-option.p-focus {
	background-color: var(--gray-700) !important;
}
</style>

<style scoped>
.create-mix__title {
	margin-bottom: 48px;
	text-align: center;
	font-size: 32px;
	line-height: 49px;
	font-weight: bold;
	color: var(--yellow-900);
}

.create-mix__text {
	max-width: 700px;
	margin: 0 auto;
	margin-bottom: 80px;
	font-size: 1.25rem;
	text-align: center;
	color: var(--yellow-700);
}

.create-mix__button {
	display: block;
	padding: 5px 30px;
	font-weight: bold;
	border: solid 1px var(--gray-700);
	border-radius: 20px;
}

.button--complete {
	font-size: 20px;
	margin: 160px auto;
	color: var(--yellow-900);
}

.remove-icon {
	order: -1;
	color: var(--yellow-900);
	font-size: 30px;
}

.remove-icon:hover {
	cursor: pointer;
}
</style>
