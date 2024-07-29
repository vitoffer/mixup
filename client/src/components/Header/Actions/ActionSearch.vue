<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid"
</script>

<template>
	<div
		class="flex items-center gap-[16px] rounded-[10px] bg-gray-light px-[16px] py-[4px]"
	>
		<MagnifyingGlassIcon class="w-[24px] text-yellow" />
		<input
			class="text-primary min-w-[600px] border-none bg-transparent text-[18px] text-yellow outline-none placeholder:text-yellow placeholder:text-opacity-60"
			type="text"
			placeholder="Поиск по треку в мэшапе"
		/>
	</div>
</template>
