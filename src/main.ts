import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ResultsSection from './components/ResultsSection.vue'
import MainForm from './components/MainForm.vue'

const app = createApp(App)
app.component('ResultsSection', ResultsSection).component('MainForm', MainForm)

app.use(ElementPlus)
app.mount('#app')
