<script setup>
import { PlayIcon } from "@heroicons/vue/24/solid"
</script>

<template>
	<button>
		<PlayIcon style="width: 16px; color: var(--bg-color)" />
		<span>Бот в дискорде</span>
	</button>
</template>

<style scoped>
button {
	display: flex;
	width: 170px;
	align-items: center;
	justify-content: center;
	gap: 5px;
	border-radius: 10px;
	border: 1px solid;
	background-color: var(--cyan);
	padding: 5px 0;
	font-family: var(--font-open-sans);
	font-size: 12px;
	line-height: 16px;
}

button:hover {
	border-color: var(--cyan);
	background-color: transparent;
	color: var(--cyan);
}

span {
	font-weight: bold;
}
</style>
