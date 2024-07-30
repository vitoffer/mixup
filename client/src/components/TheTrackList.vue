<script setup>
import TrackCard from "./TrackList/TrackCard.vue"

import trackList from "@/dev/trackList"
</script>

<template>
	<main class="m-auto flex justify-center">
		<div class="grid grid-cols-[repeat(4,_min-content)] gap-[24px]">
			<TrackCard
				v-for="track in trackList"
				:key="track.id"
				:track="track"
			/>
		</div>
	</main>
</template>
