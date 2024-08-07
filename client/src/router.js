import { createRouter, createWebHistory } from "vue-router"

import MainView from "./views/MainView.vue"
import TheTrackPage from "./components/TheTrackPage.vue"

const routes = [
	{ path: "/", component: MainView },
	{ path: "/tracks/:id", component: TheTrackPage },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
