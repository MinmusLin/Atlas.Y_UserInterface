import {registerPlugins} from '@/plugins'
import App from './App.vue'
import {createApp} from 'vue'
import '@/assets/styles/global.css'
import 'flag-icon-css/css/flag-icons.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
