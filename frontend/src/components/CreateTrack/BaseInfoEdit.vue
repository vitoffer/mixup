<script setup lang="ts">
const title = defineModel<string>("title")
const artistsNames = defineModel<string>("artistsNames")
</script>

<template>
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
</template>

<style scoped></style>
