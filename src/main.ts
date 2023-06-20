import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Results from './components/Results.vue'
import MainForm from './components/MainForm.vue'

const app = createApp(App)
app.component('Results', Results).component('MainForm', MainForm)

app.use(ElementPlus)
app.mount('#app')
