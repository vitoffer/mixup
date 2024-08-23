<script setup>
import { onMounted, reactive, ref, watch } from "vue"
import { Down } from "@icon-park/vue-next"
import Select from "primevue/select"
import PlatformSelectItem from "@/components/new-mix/PlatformLinkListItem.vue"
import { foundTrackListByPlatform } from "@/modules/createMix"

const selectItemWidth = ref("0")

const selectedTrackByPlatform = reactive({
	youtube: null,
	spotify: null,
	yandex: null,
})
const trackVKLink = ref(null)

const platforms = {
	youtube: "Youtube",
	spotify: "Spotify",
	yandex: "Яндекс Музыка",
}

watch([selectedTrackByPlatform], () => {
	console.log(selectedTrackByPlatform)

	console.log(trackVKLink)
})

onMounted(() => {
	selectItemWidth.value = getComputedStyle(
		document.querySelector(".select-section .p-select"),
	).width
})
</script>

<template>
	<section class="create-mix__select-section select-section">
		<Select
			class="select-section__select-item select-item"
			v-for="platform in Object.keys(platforms)"
			:key="platform"
			:options="foundTrackListByPlatform[platform].slice(0, 5)"
			:placeholder="platforms[platform]"
			v-model="selectedTrackByPlatform[platform]"
			optionLabel="name"
			optionValue="id"
			:pt:overlay:style="{
				width: selectItemWidth,
			}"
		>
			<template #value="slotProps">
				<div
					v-if="slotProps.value"
					:style="{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}"
				>
					{{
						foundTrackListByPlatform[platform].find(
							(track) => track.id === slotProps.value,
						).name
					}}
					-
					{{
						foundTrackListByPlatform[platform]
							.find((track) => track.id === slotProps.value)
							.authors.join(", ")
					}}
				</div>
				<span v-else>
					{{ slotProps.placeholder }}
				</span>
			</template>
			<template #dropdownicon>
				<Down
					theme="outline"
					size="24"
				/>
			</template>
			<template #empty>
				<div>Треки не загружены</div>
			</template>

			<template #option="slotProps">
				<PlatformSelectItem :track="slotProps.option" />
			</template>
		</Select>

		<input
			class="select-section__input"
			type="text"
			placeholder="Ссылка на VK Музыку (если есть)"
			v-model="trackVKLink"
		/>
	</section>
</template>

<style>
.select-section .p-select {
	width: 100%;
	font-size: 20px;
	text-align: center;
	background-color: var(--gray-800);
	border: none;
	border-radius: 10px;

	.p-select-label {
		padding: 10px 0;
		color: var(--cyan-500) !important;
	}

	.p-select-dropdown {
		position: absolute;
		top: 50%;
		right: 0;
		translate: 0 -50%;
		color: var(--cyan-500);
	}
}

.p-select-overlay {
	background-color: var(--gray-800) !important;
	border: none !important;
}

.p-select-option {
	padding: 0 !important;
}

.p-tooltip {
	max-width: initial !important;
}

.p-tooltip-text {
	color: var(--cyan-500) !important;
	background-color: var(--gray-700) !important;
}
</style>

<style scoped>
.create-mix__select-section {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 36px 24px;
	margin: 80px 100px 0;
}

.select-section__input {
	width: 100%;
	padding: 0 16px;
	font-size: 20px;
	background-color: var(--gray-800);
	border: none;
	border-radius: 10px;
}

.select-section__input::placeholder {
	font-size: 20px;
	color: var(--gray-500);
}

.select-option__wrapper {
	width: 100%;
	display: flex;
}

.select-option__text {
	width: calc(100% - 50px);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 16px;
}
</style>
