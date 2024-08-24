import { createRouter, createWebHistory } from "vue-router"

import TrackListView from "@/views/TrackList.vue"
import TrackPageView from "@/views/TrackPage.vue"
import CreateMixFirstPartView from "@/views/CreateMixFirstPart.vue"
import CreateMixSecondPartView from "@/views/CreateMixSecondPart.vue"
import NotFoundView from "@/views/NotFound.vue"

const routes = [
	{ path: "/", component: TrackListView },
	{ path: "/tracks/:id", component: TrackPageView },
	{ path: "/create-mix/1", component: CreateMixFirstPartView },
	{ path: "/create-mix/2", component: CreateMixSecondPartView },
	{ path: "/:pathMatch(.*)*", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
