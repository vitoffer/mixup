import { createRouter, createWebHistory } from "vue-router"

import TrackListView from "@/views/TrackListView.vue"
import TrackPageView from "@/views/TrackPageView.vue"
import CreateMixView from "@/views/CreateMixView.vue"
import NotFoundView from "@/views/NotFoundView.vue"

const routes = [
	{ path: "/", component: TrackListView },
	{ path: "/tracks/:id", component: TrackPageView },
	{ path: "/create-mix", component: CreateMixView },
	{ path: "/404", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
