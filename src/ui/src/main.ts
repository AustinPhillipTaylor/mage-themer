import { createApp } from 'vue'
import App from './App.vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.min.css'
import './styles/main.sass'

const app = createApp( App )

app.use( PerfectScrollbar )

app.mount( '#app' )
