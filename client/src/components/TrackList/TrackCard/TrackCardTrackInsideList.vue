<script setup lang="ts">
import { ref } from "vue"
import TrackCardTrackInside from "./TrackCardTrackInside.vue"

const props = defineProps(["trackInsideList"])

const tracksList = ref(props.trackInsideList.slice(0, 2))
</script>

<template>
	<ul class="list-tracks-inside">
		<TrackCardTrackInside
			v-for="trackInside in tracksList"
			:key="trackInside"
			:track="trackInside"
		/>
	</ul>
</template>

<style scoped>
.list-tracks-inside {
	margin-block: auto 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 14px;
	line-height: 1.4;
	color: var(--light-cyan);
}
</style>
