<script setup>
import { PlayIcon } from "@heroicons/vue/24/solid"
</script>

<template>
	<button
		class="bg-red hover:text-red hover:border-red flex items-center justify-center gap-[5px] rounded-[10px] border border-solid border-transparent px-[27px] py-[5px] hover:bg-opacity-0"
	>
		<PlayIcon style="width: 16px; color: var(--bg-color)" />
		<span class="font-open-sans line text-[12px] font-bold leading-[16px]">
			Бот в дискорде
		</span>
	</button>
</template>
