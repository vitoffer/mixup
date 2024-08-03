<script setup lang="ts">
import TrackCardPlatformLink from "./TrackCardPlatformLink.vue"

const props = defineProps(["platformList"])

const platformList = props.platformList
</script>

<template>
	<ul class="list-platforms">
		<TrackCardPlatformLink
			v-for="platform in platformList"
			:key="platform"
			:platform="platform"
		/>
	</ul>
</template>

<style scoped>
.list-platforms {
	display: flex;
	width: 100%;
	gap: 8px;
}
</style>
