<script setup lang="ts">
import TrackCardPlatformLink from "./TrackCardPlatformLink.vue"

const props = defineProps(["platformList"])

const platformList = props.platformList
</script>

<template>
	<ul class="list-platforms">
		<template
			v-for="platform in platformList"
			:key="platform"
		>
			<TrackCardPlatformLink
				v-if="platform.link"
				:platform="platform"
			/>
		</template>
	</ul>
</template>

<style scoped>
.list-platforms {
	display: flex;
	width: 100%;
	gap: 8px;
}
</style>
