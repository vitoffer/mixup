<script setup lang="ts">
import trackListIcon from "../assets/icons/track_list.svg?component"
import createTrackIcon from "../assets/icons/create_track.svg?component"
import { useRoute } from "vue-router"

const route = useRoute()

const links = [
	{
		name: "trackList",
		icon: trackListIcon,
	},
	{
		name: "createTrack",
		icon: createTrackIcon,
	},
]

function isActive(linkName: string) {
	return linkName === "trackList" &&
		(route.path === "/" || route.path.startsWith("/tracks/"))
		? true
		: linkName === "createTrack" && route.path === "/create-track"
			? true
			: false
}
</script>

<template>
	<nav
		class="absolute bottom-0 left-0 w-full rounded-t-xl bg-gray-800 py-[14px]"
	>
		<ul class="flex justify-center gap-[48px]">
			<li v-for="link in links">
				<RouterLink
					:to="link"
					:class="{ 'text-yellow-900': isActive(link.name) }"
					class="text-cyan-700"
				>
					<component :is="link.icon"></component>
				</RouterLink>
			</li>
		</ul>
	</nav>
</template>

<style scoped></style>
