import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.sass'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

const app = createApp( App )

app.use( PerfectScrollbar )

app.mount( '#app' )
