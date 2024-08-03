<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid"
</script>

<template>
	<div class="action-block">
		<MagnifyingGlassIcon style="width: 24px; color: var(--yellow)" />
		<input
			type="text"
			placeholder="Поиск по треку в мэшапе"
		/>
	</div>
</template>

<style scoped>
input {
	min-width: 600px;
	border: none;
	background-color: transparent;
	outline: none;
}

input::placeholder {
	color: color-mix(in srgb, var(--yellow) 60%, transparent);
}
</style>
