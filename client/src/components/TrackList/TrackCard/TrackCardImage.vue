<script setup>
defineProps(["imageUrl"])
</script>

<template>
	<img
		:src="imageUrl"
		alt="Card image"
		width="256"
		class="mb-[8px]"
	/>
</template>
