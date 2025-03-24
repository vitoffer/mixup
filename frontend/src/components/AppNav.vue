<script setup lang="ts">
import trackListIcon from "../assets/icons/track_list.svg?component"
import createTrackIcon from "../assets/icons/create_track.svg?component"
import { useRoute } from "vue-router"
import { onMounted } from "vue"

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

onMounted(() => {
	document.addEventListener("focusin", (event) => {
		if (window.innerWidth <= 700 && event.target instanceof HTMLInputElement) {
			document.querySelector("nav")!.style.display = "none"
		}
	})

	document.addEventListener("focusout", (event) => {
		if (window.innerWidth <= 700 && event.target instanceof HTMLInputElement) {
			document.querySelector("nav")!.style.display = "block"
		}
	})
})
</script>

<template>
	<nav
		class="nav fixed bottom-[env(safe-area-inset-bottom)] left-0 w-full rounded-t-xl bg-gray-800 py-2"
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
