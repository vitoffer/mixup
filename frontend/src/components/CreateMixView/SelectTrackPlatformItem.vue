<script setup>
defineProps(["platform"])

const platforms = {
	youtube: "Youtube",
	spotify: "Spotify",
	vk: "Vk Музыка",
	yandex: "Яндекс Музыка",
}
</script>

<template>
	<select class="select-section__item select-item">
		<option class="select-item__option">{{ platforms[platform] }}</option>
	</select>
</template>

<style scoped>
.select-section__item {
	display: flex;
	text-align: center;
	padding-block: 10px;
	font-size: 20px;
	color: var(--cyan-500);
	background-color: var(--gray-800);
	border-radius: 10px;
}
</style>
