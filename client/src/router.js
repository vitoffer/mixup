import { createRouter, createWebHistory } from "vue-router"

import MainView from "./views/MainView.vue"
import TheTrackPage from "./components/TheTrackPage.vue"
import NotFoundView from "./views/NotFoundView.vue"

const routes = [
	{ path: "/", component: MainView },
	{ path: "/tracks/:id", component: TheTrackPage },
	{ path: "/404", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
