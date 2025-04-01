import { createRouter, createWebHistory } from "vue-router"

import TrackListView from "@/views/TrackList.vue"
import TrackPageView from "@/views/TrackPage.vue"
import NotFoundView from "@/views/NotFound.vue"
import CreateMix from "@/views/CreateMix.vue"
import CreateOriginal from "@/views/CreateOriginal.vue"

const routes = [
	{ name: "trackList", path: "/", component: TrackListView },
	{ name: "trackPage", path: "/tracks/:id", component: TrackPageView },
	{ name: "createMix", path: "/create-mix", component: CreateMix },
	{
		name: "createOriginal",
		path: "/create-original",
		component: CreateOriginal,
	},
	{ path: "/:pathMatch(.*)*", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
