<script setup>
import { Search } from "@icon-park/vue-next"

const searchTrackModel = defineModel("searchTrack", {
	type: String,
	required: true,
})
</script>

<template>
	<div class="search__wrapper">
		<Search
			class="search__icon"
			theme="outline"
			size="20"
		/>
		<input
			class="search__input"
			type="text"
			placeholder="Поиск трека"
			v-model="searchTrackModel"
		/>
	</div>
</template>

<style scoped>
.search__wrapper {
	display: flex;
	align-items: center;
	gap: 16px;
	width: 600px;
	padding: 8px 16px;
	margin: 24px auto 0;
	background-color: var(--gray-800);
	border-radius: 10px;
	color: var(--yellow-900);
}

.search__icon {
	margin-left: 16px;
}

.search__input {
	width: 100%;
}

.search__input::placeholder {
	color: var(--yellow-800);
}
</style>
