import { createRouter, createWebHistory } from "vue-router"

import TrackListView from "@/views/TrackList.vue"
import TrackPageView from "@/views/TrackPage.vue"
import CreateMixFirstPartView from "@/views/CreateMixFirstPart.vue"
import CreateMixSecondPartView from "@/views/CreateMixSecondPart.vue"
import NotFoundView from "@/views/NotFound.vue"

const routes = [
	{ name: "trackList", path: "/", component: TrackListView },
	{ name: "trackPage", path: "/tracks/:id", component: TrackPageView },
	{ path: "/create-mix/1", component: CreateMixFirstPartView },
	{
		path: "/create-mix/2",
		name: "createMixSecondPage",
		component: CreateMixSecondPartView,
		props: true,
	},
	{ path: "/:pathMatch(.*)*", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
