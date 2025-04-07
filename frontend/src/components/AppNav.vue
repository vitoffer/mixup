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
		name: "createMix",
		icon: createTrackIcon,
	},
]

function isActive(linkName: string) {
	return linkName === "trackList" &&
		(route.path === "/" || route.path.startsWith("/tracks/"))
		? true
		: linkName === "createMix" &&
			  (route.path === "/create-mix" || route.path === "/create-original")
			? true
			: false
}
</script>

<template>
	<nav
		class="nav fixed bottom-0 left-0 z-10000 w-full rounded-t-xl bg-gray-800 py-2"
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
