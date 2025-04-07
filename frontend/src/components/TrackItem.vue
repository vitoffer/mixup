<script setup lang="ts">
import { RouterLink } from "vue-router"
import thumbnailPlaceholder from "@/assets/images/thumbnail_placeholder.png"
import { Track, TrackPlatformSearchResult } from "@/types"
import { computed, ref, watch, watchEffect } from "vue"

const props = withDefaults(
	defineProps<{
		track: Track | TrackPlatformSearchResult
		withLinks?: boolean
		unbordered?: boolean
	}>(),
	{
		withLinks: false,
		unbordered: false,
	},
)

const navLink = computed(() => {
	return "id" in props.track
		? {
				name: "trackPage",
				params: { id: props.track.id },
			}
		: null
})

const imageLoaded = ref(false)
const imageSrc = ref(props.track.thumbnailUrl)

const imagePlaceholderSetTimeout = setTimeout(() => {
	imageSrc.value = thumbnailPlaceholder
}, 250)

watch(
	() => imageLoaded.value,
	(newValue) => {
		if (newValue) {
			clearTimeout(imagePlaceholderSetTimeout)
		}
	},
)
</script>

<template>
	<article
		class="w-full"
		:class="{ 'border-y border-gray-700': !unbordered }"
	>
		<component
			:is="withLinks ? RouterLink : 'div'"
			:to="navLink"
			class="flex items-center gap-3 py-2"
		>
			<div class="relative aspect-square w-[56px] min-w-0 rounded-[10px]">
				<div
					v-if="!imageLoaded"
					class="absolute inset-0 z-10 h-full w-full rounded-[10px] bg-gray-700"
				></div>
				<img
					:src="imageSrc"
					alt="Картинка трека"
					class="absolute inset-0 h-full w-full rounded-[10px] object-cover"
					@load="imageLoaded = true"
				/>
			</div>
			<div class="flex w-full flex-col gap-[6px]">
				<p class="line-clamp-2 text-[1rem] break-words text-yellow-900">
					{{ track.title }}
				</p>
				<p class="truncate text-[0.875rem] text-yellow-700">
					{{ track.artistsNames.join(", ") }}
				</p>
			</div>
		</component>
	</article>
</template>

<style scoped>
p {
	text-wrap: balance;
}
</style>
