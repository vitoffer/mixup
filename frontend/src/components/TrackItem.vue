<script setup lang="ts">
import { MixTrack, OriginalTrack } from "@/types"
import { RouterLink } from "vue-router"

withDefaults(
	defineProps<{
		track: MixTrack | OriginalTrack
		withLinks: boolean
		unbordered?: boolean
	}>(),
	{
		unbordered: false,
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
		</component>
	</article>
</template>

<style scoped></style>
