import { h } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler'
import router from './router'
import { store, key } from './store'
import './assets/global.css'

const App = createApp({})
const app  = createApp({
  render: () => h(App)
});

App.use(router)
App.use(store, key)
App.mount('#app')
