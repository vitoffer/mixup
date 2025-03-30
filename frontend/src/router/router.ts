import { createRouter, createWebHistory } from "vue-router"

import TrackListView from "@/views/TrackList.vue"
import TrackPageView from "@/views/TrackPage.vue"
import CreateTrackView from "@/views/CreateTrack.vue"
import NotFoundView from "@/views/NotFound.vue"

const routes = [
	{ name: "trackList", path: "/", component: TrackListView },
	{ name: "trackPage", path: "/tracks/:id", component: TrackPageView },
	{ name: "createTrack", path: "/create-track", component: CreateTrackView },
	{ path: "/:pathMatch(.*)*", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
