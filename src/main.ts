import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { store } from './store'
app.use(store)

import router from './router'
app.use(router)

app.mount('#app')
