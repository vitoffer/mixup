<script setup lang="ts">
const searchTrackModel = defineModel<string>()
</script>

<template>
	<div class="flex items-center gap-2 rounded-[10px] bg-gray-800 px-4 py-3">
		<i class="pi pi-search text-yellow-900"></i>
		<input
			class="w-full text-yellow-900 placeholder:text-yellow-800"
			type="text"
			placeholder="Поиск микса"
			v-model.trim="searchTrackModel"
		/>
	</div>
</template>

<style scoped></style>
