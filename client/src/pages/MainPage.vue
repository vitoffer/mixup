<script setup>
import TrackList from "../components/TheTrackList.vue"
import TheHeader from "../components/TheHeader.vue"
</script>

<template>
	<div class="container1">
		<div class="content">
			<TheHeader />
			<TrackList />
		</div>
	</div>
</template>

<style scoped>
.container1 {
	background-color: var(--gray);
	padding-top: 16px;
	width: 100%;
	min-height: 100vh;
}

.content {
	width: 1440px;
	margin: auto;
}
</style>
