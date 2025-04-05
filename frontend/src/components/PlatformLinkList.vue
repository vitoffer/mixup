<script setup lang="ts">
import { Platform, Track } from "@/types"
import spotifyLogo from "@/assets/icons/spotify_logo.svg?url"
import yandexLogo from "@/assets/icons/yandexMusic_logo.svg?url"
import youtubeLogo from "@/assets/icons/youtubeMusic_logo.svg?url"

const props = defineProps<{
	urls: Pick<Track, "urls">["urls"]
}>()

function getLogo(platformName: Platform): string {
	return platformName === "spotify"
		? spotifyLogo
		: platformName === "yandexMusic"
			? yandexLogo
			: youtubeLogo
}
</script>

<template>
	<div>
		<ul class="flex gap-1">
			<template
				v-for="platform in ['youtubeMusic', 'spotify', 'yandexMusic']"
				:key="platform"
			>
				<li
					v-if="urls[platform as Platform] !== null"
					class="flex cursor-pointer items-center justify-center bg-gray-800 px-2.5 py-2 first:rounded-l-[10px] last:rounded-r-[10px]"
				>
					<a :href="urls[platform as Platform]!">
						<img
							:src="getLogo(platform as Platform)"
							alt="Platform logo"
							class="w-[34px]"
						/>
					</a>
				</li>
			</template>
		</ul>
	</div>
</template>

<style scoped></style>
