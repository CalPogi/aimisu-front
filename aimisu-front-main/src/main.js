import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'
import '@/assets/styles/main.css'
import '@flaticon/flaticon-uicons/css/all/all.css'

const app = createApp(App)

app.component('VueApexCharts', VueApexCharts)
app.use(createPinia())
app.use(router)

app.mount('#app')
