<script setup>
import { PlayIcon } from "@heroicons/vue/24/solid"
</script>

<template>
	<button
		class="flex w-[170px] items-center justify-center gap-[5px] rounded-[10px] border border-solid bg-cyan py-[5px] font-primary text-[12px] leading-[16px] hover:border-cyan hover:bg-transparent hover:text-cyan"
	>
		<PlayIcon style="width: 16px; color: var(--bg-color)" />
		<span class="font-bold">Бот в дискорде</span>
	</button>
</template>
