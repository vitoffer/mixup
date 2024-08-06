<script setup>
import TrackItem from "./TrackList/TrackItem.vue"
import trackList from "@/dev/trackList"
</script>

<template>
	<main class="container">
		<ul class="track-list">
			<TrackItem
				v-for="track in trackList"
				:key="track.id"
				:track="track"
			/>
		</ul>
	</main>
</template>

<style scoped>
.container {
	width: 1200px;
	margin: 32px auto;
}
</style>
