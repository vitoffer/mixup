import { createRouter, createWebHistory } from "vue-router"

import TrackListView from "@/views/TrackList.vue"
import TrackPageView from "@/views/TrackPage.vue"
import NotFoundView from "@/views/NotFound.vue"

const routes = [
	{ name: "trackList", path: "/", component: TrackListView },
	{ name: "trackPage", path: "/tracks/:id", component: TrackPageView },
	{ path: "/:pathMatch(.*)*", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
