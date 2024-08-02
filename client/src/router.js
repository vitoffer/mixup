import { createRouter, createWebHistory } from "vue-router"
import AddTrack from "./dev/AddTrack.vue"
import MainPage from "./pages/MainPage.vue"

const routes = [
	{ path: "/", component: MainPage },
	{ path: "/add-track", component: AddTrack },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
