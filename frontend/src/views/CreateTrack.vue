<script setup lang="ts">
import { ref } from "vue"
import youtubeMusicIcon from "../assets/icons/youtube_logo.svg?url"
import spotifyIcon from "../assets/icons/spotify_logo.svg?url"
import yandexMusicIcon from "../assets/icons/yandex_logo.svg?url"
import { trackList } from "@/storage/storage"

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

const savedLinks = ref({
	youtubeLink: "",
	spotify: "",
	yandexMusic: "",
})

const tags = ref<string[]>(["Tag 1"])
</script>

<template>
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
					<div class="aspect-square w-2 rounded-full bg-cyan-700"></div>
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
			/>
			<input
				type="text"
				placeholder="Редактировать автора(-ов через запятую)"
				class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
			/>
		</div>
		<div class="flex w-full flex-col gap-2">
			<p class="text-bold mb-1 text-lg leading-none text-yellow-700">Теги:</p>
			<ul>
				<li v-for="tag in tags">
					<Chip
						:label="tag"
						removable
						remove-icon="pi pi-times"
					/>
				</li>
			</ul>
			<input
				type="text"
				placeholder="+ Тег"
				class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
			/>
		</div>
		<div class="flex w-full flex-col gap-2">
			<p class="text-bold mb-1 text-lg leading-none text-yellow-700">
				Оригиналы:
			</p>
			<ul>
				<li
					v-for="track in trackList"
					:key="track.id"
					class="not-first:-translate-y-[1px]"
				>
					<TrackItem :track="track" />
				</li>
			</ul>
			<input
				type="text"
				placeholder="Поиск трека по базе"
				class="mt-1 w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
			/>
		</div>
		<button
			class="mb-[52px] flex items-center justify-center rounded-[10px] bg-yellow-800 px-16 py-4 text-2xl leading-none font-bold"
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

.p-chip {
	@apply flex w-fit gap-1.5 rounded-full bg-gray-800 px-3 py-2.5 text-cyan-700;
}
</style>
