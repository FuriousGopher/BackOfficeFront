import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.mount('#app')
