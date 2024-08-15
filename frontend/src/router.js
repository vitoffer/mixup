import { createRouter, createWebHistory } from "vue-router"

import MainView from "@/views/MainView.vue"
import TrackView from "@/views/TrackView.vue"
import CreateMixView from "@/views/CreateMixView.vue"
import NotFoundView from "@/views/NotFoundView.vue"

const routes = [
	{ path: "/", component: MainView },
	{ path: "/tracks/:id", component: TrackView },
	{ path: "/create-mix", component: CreateMixView },
	{ path: "/404", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
