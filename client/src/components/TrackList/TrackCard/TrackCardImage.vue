<script setup>
defineProps(["imageUrl"])
</script>

<template>
	<img
		v-if="imageUrl"
		:src="imageUrl"
		alt="Card image"
		width="256"
		height="256"
		class="card-image"
	/>
	<div
		v-else
		class="empty-image-div"
	></div>
</template>

<style>
.card-image {
	margin-bottom: 8px;
}
.empty-image-div {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 8px;
	width: 256px;
	height: 256px;
}
</style>
