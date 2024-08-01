<script setup lang="ts">
import { ref } from "vue"
import TrackCardTrackInside from "./TrackCardTrackInside.vue"

const props = defineProps(["trackInsideList"])

const tracksList = ref(props.trackInsideList.slice(0, 2))
</script>

<template>
	<ul
		class="list  mb-[8px] mt-auto flex flex-col items-center text-[14px] leading-[1.4] text-cyan-light"
	>
		<TrackCardTrackInside
			v-for="trackInside in tracksList"
			:key="trackInside"
			:track="trackInside"
		/>
	</ul>
</template>
