<script setup>
import BaseLayout from "@/components/utilities/BaseLayout.vue"
</script>

<template>
	<BaseLayout class="create-mix">
		<h3 class="create-mix__title">Форма добавления микса</h3>

		<section class="create-mix__input-section input-section">
			<input
				class="input-section__item"
				type="text"
				placeholder="Название"
			/>
			<input
				class="input-section__item"
				type="text"
				placeholder="Авторы (через запятую)"
			/>
		</section>

		<section class="create-mix__select-section select-section">
			<select class="select-section__item select-item">
				<option class="select-item__option">Youtube</option>
			</select>
			<select class="select-section__item">
				<option class="select-item__option">Spotify</option>
			</select>
			<select class="select-section__item">
				<option class="select-item__option">VK Музыка</option>
			</select>
			<select class="select-section__item">
				<option class="select-item__option">Яндекс Музыка</option>
			</select>
		</section>

		<button class="create-mix__button-next">Далее</button>
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

.create-mix__select-section {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 36px 24px;
	margin: 128px 100px 0;
}

.select-section__item {
	display: flex;
	text-align: center;
	padding-block: 10px;
	font-size: 20px;
	color: var(--cyan-500);
	background-color: var(--gray-800);
	border-radius: 10px;
}

.create-mix__button-next {
	display: block;
	margin: 160px auto;
	padding: 5px 30px;
	font-size: 20px;
	font-weight: bold;
	color: var(--yellow-900);
	border: solid 1px var(--gray-700);
	border-radius: 20px;
}
</style>
