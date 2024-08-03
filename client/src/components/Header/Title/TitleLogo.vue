<script setup>
import logoUrl from "@/assets/images/logo_color.svg"
</script>

<template>
	<a href="/">
		<img
			:src="logoUrl"
			alt="Logo"
			width="48"
			height="48"
		/>
	</a>
</template>

<style scoped>
a {
	color: var(--yellow);
}
</style>
