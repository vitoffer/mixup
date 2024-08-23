import { createApp } from "vue"
import PrimeVue from "primevue/config"
import Tooltip from "primevue/tooltip"
import Aura from "@primevue/themes/aura"
import App from "./App.vue"
import { router } from "@/router/router"

import "@/assets/fonts/CarterOne/stylesheet.css"
import "@/assets/fonts/Nunito/stylesheet.css"

import "@/assets/styles/reset.css"
import "@/assets/styles/main.css"

export const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
	theme: {
		preset: Aura,
	},
})

app.directive("tooltip", Tooltip)

app.mount("#app")
