<script setup>
import { ref } from "vue"
import BaseLayout from "@/components/BaseLayout.vue"
import SearchBar from "@/components/SearchBar.vue"
import PlatformLinkSelectList from "@/components/new-mix/PlatformLinkList.vue"
import {
	selectedTrackIdByPlatform,
	findTrackOnPlatforms,
} from "@/modules/createMix"

const searchTrack = ref("")
</script>

<template>
	<BaseLayout class="create-mix">
		<h3 class="create-mix__title">Форма добавления микса</h3>

		<SearchBar
			class="create-mix__search-platforms"
			v-model:search-track="searchTrack"
		/>

		<button
			class="create-mix__button button--find"
			@click.prevent="findTrackOnPlatforms(searchTrack)"
		>
			Найти
		</button>

		<PlatformLinkSelectList />

		<button class="create-mix__button button--next">Далее</button>
	</BaseLayout>
</template>

<style scoped>
.create-mix__title {
	text-align: center;
	font-size: 32px;
	line-height: 49px;
	font-weight: bold;
	color: var(--yellow-900);
}

.create-mix__search-platforms {
	margin-top: 128px;
}

.create-mix__button {
	display: block;
	padding: 5px 30px;
	font-weight: bold;
	border: solid 1px var(--gray-700);
	border-radius: 20px;
}

.button--find {
	font-size: 18px;
	margin: 48px auto;
	color: var(--yellow-700);
}

.button--next {
	font-size: 20px;
	margin: 160px auto;
	color: var(--yellow-900);
}
</style>
