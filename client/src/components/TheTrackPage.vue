<script setup>
import OriginalTracks from "./TrackPage/OriginalTracks.vue"
import TrackInfo from "./TrackPage/TrackInfo.vue"
</script>

<template>
	<article>
		<TrackInfo />
		<OriginalTracks />
	</article>
	Тут конкретный трек с id: {{ $route.params.id }}
</template>

<style scoped></style>
