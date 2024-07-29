<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/solid"
</script>

<template>
	<div class="flex flex-grow justify-end gap-[32px]">
		<div
			class="header-action-block"
			v-for="item in ['Платформа', 'Жанр']"
			:key="item"
		>
			<span>{{ item }}</span>
			<button>
				<ChevronDownIcon class="w-[20px]" />
			</button>
		</div>
	</div>
</template>
