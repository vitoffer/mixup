<script setup lang="ts">
import { MixTrack, OriginalTrack } from "@/types"

defineProps<{
	track: MixTrack | OriginalTrack
}>()
</script>

<template>
	<article class="w-full border-y border-gray-700">
		<RouterLink
			:to="{ name: 'trackPage', params: { id: track.id } }"
			class="flex items-center gap-3 py-2"
		>
			<img
				:src="track.thumbnailUrl || '/'"
				alt=""
				class="aspect-square w-[56px] rounded-[10px]"
			/>
			<div class="flex min-w-0 flex-col gap-[6px]">
				<p class="w-full text-[1rem] text-yellow-900">
					{{ track.title }}
				</p>
				<p
					class="w-full overflow-hidden text-[0.875rem] text-nowrap text-ellipsis text-yellow-700"
				>
					{{ track.artistsNames.join(", ") }}
				</p>
			</div>
		</RouterLink>
	</article>
</template>

<style scoped></style>
