import { createApp } from "vue"
import PrimeVue from "primevue/config"
import Tooltip from "primevue/tooltip"
import App from "./App.vue"
import { router } from "@/router/router"
import ConfirmationService from "primevue/confirmationservice"

import "@/assets/fonts/CarterOne/stylesheet.css"
import "@/assets/fonts/Nunito/stylesheet.css"

import "primeicons/primeicons.css"
import "@/assets/styles/main.css"

const app = createApp(App)

app.use(router)

app.use(PrimeVue, { theme: "none" })
app.use(ConfirmationService)

app.directive("tooltip", Tooltip)

app.mount("#app")
