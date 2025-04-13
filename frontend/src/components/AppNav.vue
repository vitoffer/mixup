<script setup lang="ts">
import trackListIcon from "../assets/icons/track_list.svg?component"
import createTrackIcon from "../assets/icons/create_track.svg?component"
import loginIcon from "../assets/icons/login.svg?component"
import { useRoute } from "vue-router"
import { DefineComponent, ref, watch } from "vue"
import { useUserStore } from "@/stores/user"
import axios from "axios"

const route = useRoute()
const userStore = useUserStore()

const links = ref<{ name: string; icon: DefineComponent }[]>([])

watch(() => userStore.token, getAccessibleLinks, { immediate: true })

async function getAccessibleLinks() {
	links.value = [
		{
			name: "trackList",
			icon: trackListIcon,
		},
		{
			name: "login",
			icon: loginIcon,
		},
	]

	const linksOrder = ["trackList", "createMix", "login"]

	const sortByObj = linksOrder.reduce<Record<string, number>>(
		(obj, item, index) => {
			return {
				...obj,
				[item]: index,
			}
		},
		{},
	)

	// try {
	// 	 const {data} = await axios.post()
	// }

	links.value.push({
		name: "createMix",
		icon: createTrackIcon,
	})

	links.value.sort((a, b) => sortByObj[a.name] - sortByObj[b.name])
}

function isActive(linkName: string) {
	return linkName === "trackList" &&
		(route.path === "/" || route.path.startsWith("/tracks/"))
		? true
		: linkName === "createMix" &&
			  (route.path === "/create-mix" || route.path === "/create-original")
			? true
			: linkName === "login" && route.path === "/login"
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
