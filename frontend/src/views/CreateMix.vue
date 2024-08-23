<script setup>
import { ref } from "vue"
import BaseLayout from "@/components/BaseLayout.vue"
import PlatformLinkSelectList from "@/components/new-mix/PlatformLinkList.vue"
import { findTrackOnPlatforms } from "@/modules/createMix"

const findTrackNameElement = ref()
const findTrackAuthorsElement = ref()
</script>

<template>
	<BaseLayout class="create-mix">
		<h3 class="create-mix__title">Форма добавления микса</h3>

		<section class="create-mix__input-section input-section">
			<input
				class="input-section__item"
				type="text"
				placeholder="Название"
				ref="findTrackNameElement"
			/>
			<input
				class="input-section__item"
				type="text"
				placeholder="Авторы (через запятую)"
				ref="findTrackAuthorsElement"
			/>
		</section>

		<button
			class="create-mix__button button--find"
			@click.prevent="
				findTrackOnPlatforms(findTrackNameElement, findTrackAuthorsElement)
			"
		>
			Найти трек на площадках
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

.create-mix__input-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 100px;
}

.input-section__item {
	width: 600px;
	padding: 8px 16px;
	margin: 24px auto 0;
	background-color: var(--gray-800);
	border-radius: 10px;
	font-weight: 500;
	color: var(--yellow-900);
}

.input-section__item::placeholder {
	color: var(--yellow-800);
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
