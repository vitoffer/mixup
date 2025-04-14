import { createRouter, createWebHistory } from "vue-router"

import TrackListView from "@/views/TrackList.vue"
import TrackPageView from "@/views/TrackPage.vue"
import NotFoundView from "@/views/NotFound.vue"
import CreateMix from "@/views/CreateMix.vue"
import CreateOriginal from "@/views/CreateOriginal.vue"
import LoginView from "@/views/Login.vue"
import RegisterModeratorView from "@/views/RegisterModerator.vue"
import { type RouteRecordRaw } from "vue-router"
import { apiCheckRole } from "@/api/auth"

const routes: RouteRecordRaw[] = [
	{ name: "trackList", path: "/", component: TrackListView },
	{ name: "trackPage", path: "/tracks/:id", component: TrackPageView },
	{
		name: "createMix",
		path: "/create-mix",
		component: CreateMix,
		beforeEnter: async () => {
			return await apiCheckRole(["moderator", "admin"])
		},
	},
	{
		name: "createOriginal",
		path: "/create-original",
		component: CreateOriginal,
	},
	{ name: "login", path: "/login", component: LoginView },
	{
		name: "regModer",
		path: "/reg-moder",
		component: RegisterModeratorView,
		beforeEnter: async () => {
			return await apiCheckRole(["admin"])
		},
	},
	{ path: "/:pathMatch(.*)*", component: NotFoundView },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
