import {registerPlugins} from '@/plugins'
import App from './App.vue'
import {createApp} from 'vue'
import '@/styles/global.css'
import 'flag-icons/css/flag-icons.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
