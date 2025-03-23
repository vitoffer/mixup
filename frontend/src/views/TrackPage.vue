<script setup lang="ts">
import BackButton from "@/components/BackButton.vue"
import PlatformLinkList from "@/components/PlatformLinkList.vue"
import { trackList } from "@/storage/storage"
import { Track } from "@/types"
import { ref, Ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
console.log(route.params)

const track: Ref<Track | null> = ref(null)

loadTrack()

async function loadTrack() {
	const data = trackList.value.find((track) => track.id === route.params.id)

	track.value = data ?? null
}
</script>

<template>
	<BackButton />
	<div>
		<div
			v-if="track"
			class="flex flex-col items-center gap-3"
		>
			<img
				:src="track.thumbnailUrl"
				alt="Картинка трека"
				class="aspect-square w-[250px] rounded-[10px]"
			/>
			<div class="flex flex-col gap-2">
				<h1 class="text-center text-xl font-bold text-yellow-900">
					{{ track.title }}
				</h1>
				<p class="text-center text-lg text-yellow-700">
					{{ track.artistsNames.join(", ") }}
				</p>
			</div>
			<PlatformLinkList :urls="track.urls" />
		</div>
	</div>
</template>
