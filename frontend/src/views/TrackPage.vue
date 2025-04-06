<script setup lang="ts">
import BackButton from "@/components/BackButton.vue"
import PlatformLinkList from "@/components/PlatformLinkList.vue"
import TrackItem from "@/components/TrackItem.vue"

import { Track } from "@/types"
import { ref, Ref, watch } from "vue"
import { useRoute } from "vue-router"
import thumbnailPlaceholder from "@/assets/images/thumbnail_placeholder.png"
import { trackList } from "@/modules/trackList"

const track: Ref<Track | null> = ref(null)

async function loadTrack(id: string) {
	const data = trackList.value.find((track) => track.id === id)

	track.value = data ?? null
}

const route = useRoute()

watch(
	() => route.params.id,
	(newId) => {
		loadTrack(newId as string)
	},
	{ immediate: true },
)
</script>

<template>
	<BackButton />
	<div
		v-if="track"
		class="flex flex-col gap-5"
	>
		<div class="flex flex-col items-center gap-3">
			<img
				:src="track.thumbnailUrl || thumbnailPlaceholder"
				alt="Картинка трека"
				class="aspect-square w-[250px] rounded-[10px]"
			/>
			<div class="flex flex-col gap-2">
				<h1 class="text-center text-xl leading-5 font-bold text-yellow-900">
					{{ track.title }}
				</h1>
				<p class="text-center text-lg leading-5 text-yellow-700">
					{{ track.artistsNames.join(", ") }}
				</p>
			</div>
			<PlatformLinkList :urls="track.urls" />
		</div>
		<div
			v-if="track.isMix"
			class="flex flex-col gap-3"
		>
			<p class="text-center text-cyan-700">Оригиналы:</p>
			<ul class="track-list">
				<li
					v-for="track in (track as Track).originalTracks"
					:key="track.id"
					class="not-first:-translate-y-[1px]"
				>
					<TrackItem :track="track" />
				</li>
			</ul>
		</div>
	</div>
</template>
