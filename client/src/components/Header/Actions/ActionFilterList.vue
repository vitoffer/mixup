<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/solid"
</script>

<template>
	<div class="filters-list">
		<div
			class="action-block"
			v-for="item in ['Платформа', 'Жанр']"
			:key="item"
		>
			<span>{{ item }}</span>
			<button>
				<ChevronDownIcon style="width: 20px; color: var(--yellow)" />
			</button>
		</div>
	</div>
</template>

<style scoped>
.filters-list {
	display: flex;
	flex-grow: 1;
	justify-content: end;
	gap: 32px;
}
</style>
