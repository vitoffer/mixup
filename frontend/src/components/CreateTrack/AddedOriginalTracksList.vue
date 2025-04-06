<script setup lang="ts">
import { Track, TrackPlatformSearchResult } from "@/types"
import TrackItem from "../TrackItem.vue"

defineProps<{
	originalTracksList: (Track | TrackPlatformSearchResult)[]
}>()

defineEmits<{
	deleteOriginalTrack: [title: string]
}>()
</script>

<template>
	<p
		v-if="originalTracksList.length === 0"
		class="text-[0.875rem] text-cyan-700"
	>
		Пока нет оригиналов. Добавьте первый (если нужно) ниже
	</p>
	<ul v-else>
		<li
			v-for="(originalTrack, index) in originalTracksList"
			:key="originalTrack.title"
			class="relative"
		>
			<TrackItem
				:track="originalTrack"
				unbordered
			/>
			<button
				class="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer rounded-lg bg-gray-800 p-2 leading-0"
				@click="$emit('deleteOriginalTrack', originalTrack.title)"
			>
				<span class="hidden">Удалить оригинальный трек</span>
				<i class="pi pi-times text-red-900"></i>
			</button>
		</li>
	</ul>
</template>

<style scoped></style>
