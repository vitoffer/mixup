import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./router"

import "@/assets/fonts/CarterOne/stylesheet.css"
import "@/assets/fonts/Nunito/stylesheet.css"

import "@icon-park/vue-next/styles/index.css"

import "@/assets/styles/reset.css"
import "@/assets/styles/main.css"

const app = createApp(App)

app.use(router)

app.mount("#app")
