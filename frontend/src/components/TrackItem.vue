<script setup lang="ts">
import { MixTrack } from "@/types"

const props = defineProps<{
	track: MixTrack
}>()
</script>

<template>
	<div>
		<img
			:src="track.thumbnailUrl || '/'"
			alt=""
		/>
		{{ track.title }}
	</div>
</template>

<style scoped></style>
