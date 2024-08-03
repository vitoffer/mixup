<script setup>
import TitleLogo from "./Title/TitleLogo.vue"
import TitleSection from "./Title/TitleSection.vue"
</script>

<template>
	<div class="header-title">
		<TitleLogo />
		<TitleSection />
	</div>
</template>

<style scoped>
.header-title {
	display: flex;
	align-items: center;
	gap: 8px;
}
</style>
