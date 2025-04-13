import { createApp } from "vue"
import PrimeVue from "primevue/config"
import Tooltip from "primevue/tooltip"
import App from "./App.vue"
import { router } from "@/router/router"
import ConfirmationService from "primevue/confirmationservice"
import ToastService from "primevue/toastservice"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

import "@/assets/fonts/CarterOne/stylesheet.css"
import "@/assets/fonts/Nunito/stylesheet.css"

import "primeicons/primeicons.css"
import "@/assets/styles/main.css"

const app = createApp(App)

app.use(router)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(PrimeVue, { theme: "none" })
app.use(ConfirmationService)
app.use(ToastService)

app.directive("tooltip", Tooltip)

app.mount("#app")
