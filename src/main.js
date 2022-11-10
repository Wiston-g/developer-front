import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/bootstrap.min.css'
import '@/assets/custom_styles.css'
import '@/assets/bootstrap.bundle.min.js'
import 'material-icons/iconfont/material-icons.css'
import Vuelidate from 'vuelidate'


const app = createApp(App)
app.use(Vuelidate)
app.use(store)
app.use(router)
app.mount('#app')
