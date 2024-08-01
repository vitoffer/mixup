<script setup lang="ts">
import TrackCardTrackInside from "./TrackCardTrackInside.vue"

defineProps(["trackInsideList"])
</script>

<template>
	<ul class="list mb-[8px] text-[14px] leading-[1.4] text-cyan-light">
		<TrackCardTrackInside
			v-for="trackInside in trackInsideList"
			:key="trackInside"
			:track="trackInside"
		/>
	</ul>
</template>
