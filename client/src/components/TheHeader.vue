<script setup>
import HeaderActions from "./Header/HeaderActions.vue"
import HeaderTitle from "./Header/HeaderTitle.vue"
</script>

<template>
	<header>
		<HeaderTitle />
		<HeaderActions />
	</header>
</template>

<style scoped>
header {
	margin-bottom: 16px;
	display: flex;
	align-items: center;
	gap: 24px;
}
</style>
