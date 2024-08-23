import { createRouter, createWebHistory } from "vue-router"

import TrackListView from "@/views/TrackList.vue"
import TrackPageView from "@/views/TrackPage.vue"
import CreateMixView from "@/views/CreateMix.vue"
import NotFoundView from "@/views/NotFound.vue"

const routes = [
	{ path: "/", component: TrackListView },
	{ path: "/tracks/:id", component: TrackPageView },
	{ path: "/create-mix", component: CreateMixView },
	{ path: "/:pathMatch(.*)*", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
