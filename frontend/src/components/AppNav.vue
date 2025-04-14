<script setup lang="ts">
import trackListIcon from "../assets/icons/track_list.svg?component"
import createTrackIcon from "../assets/icons/create_track.svg?component"
import userIcon from "../assets/icons/user.svg?component"
import regModerIcon from "../assets/icons/reg-moder.svg?component"
import { useRoute } from "vue-router"
import { DefineComponent, shallowRef, watch } from "vue"
import { useUserStore } from "@/stores/userStore"

const route = useRoute()
const userStore = useUserStore()

const links = shallowRef<{ name: string; icon: DefineComponent }[]>([])

watch(() => userStore.token, getAccessibleLinks, { immediate: true })

async function getAccessibleLinks() {
	links.value = [
		{
			name: "trackList",
			icon: trackListIcon,
		},
		{
			name: "login",
			icon: userIcon,
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

	if (await userStore.checkRole(["moderator", "admin"]))
		links.value.push({
			name: "createMix",
			icon: createTrackIcon,
		})

	if (await userStore.checkRole(["admin"]))
		links.value.push({
			name: "regModer",
			icon: regModerIcon,
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
				: linkName === "regModer" && route.path === "/reg-moder"
					? true
					: false
}
</script>

<template>
	<nav
		class="nav fixed bottom-0 left-0 z-10000 w-full rounded-t-xl bg-gray-800 py-2"
	>
		<ul class="flex items-baseline justify-center gap-[48px]">
			<li
				v-for="link in links"
				class="leading-0"
			>
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
