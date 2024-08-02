import { createApp } from "vue"
import App from "./App.vue"

import "./styles/reset.css"
import "./styles/main.css"

import "./assets//fonts/open_sans/stylesheet.css"
import "./assets/fonts/holtwood_one_sc/stylesheet.css"
import "./assets/fonts/nunito_sans/stylesheet.css"
import { router } from "./router"

const app = createApp(App)

app.use(router)
app.mount("#app")
