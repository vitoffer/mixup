<script setup>
import ActionFilterList from "./Actions/ActionFilterList.vue"
import ActionSearch from "./Actions/ActionSearch.vue"
</script>

<template>
	<div class="actions-container">
		<ActionSearch />
		<ActionFilterList />
	</div>
</template>

<style scoped>
.actions-container {
	display: flex;
	flex-grow: 1;
	justify-content: space-between;
}

.actions-container :deep(.action-block) {
	display: flex;
	min-width: 150px;
	align-items: center;
	justify-content: center;
	gap: 16px;
	border-radius: 10px;
	background-color: var(--light-gray);
	padding: 4px 20px;
	font-size: 18px;
	color: var(--yellow);
}
</style>
