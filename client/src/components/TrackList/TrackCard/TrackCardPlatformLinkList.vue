<script setup lang="ts">
import TrackCardPlatformLink from "./TrackCardPlatformLink.vue"

const props = defineProps(["platformList"])

const platformList = props.platformList
</script>

<template>
	<ul class="mt-auto flex w-[100%] gap-[8px]">
		<TrackCardPlatformLink
			v-for="platform in platformList"
			:key="platform"
			:platform="platform"
		/>
	</ul>
</template>
