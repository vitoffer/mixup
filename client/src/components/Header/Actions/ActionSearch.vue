<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid"
</script>

<template>
	<div class="header-action-block">
		<MagnifyingGlassIcon class="w-[24px] text-yellow" />
		<input
			class="min-w-[600px] border-none bg-transparent outline-none placeholder:text-yellow placeholder:text-opacity-60"
			type="text"
			placeholder="Поиск по треку в мэшапе"
		/>
	</div>
</template>
