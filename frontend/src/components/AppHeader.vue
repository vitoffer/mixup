<script setup>
import HeaderNav from "@/components/Header/HeaderNav.vue"
import HeaderBranding from "@/components/Header/HeaderBranding.vue"
</script>

<template>
	<header class="header">
		<div class="header__inner">
			<HeaderBranding />
			<HeaderNav />
		</div>
	</header>
</template>

<style scoped>
.header {
	box-sizing: content-box;
	height: 48px;
	padding-block: 8px;
	border-bottom: solid 1px var(--gray-600);
}

.header__inner {
	position: relative;
	display: flex;
	width: 1440px;
	height: 100%;
	margin-inline: auto;
}
</style>
