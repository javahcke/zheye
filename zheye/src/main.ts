import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://api.vikingship.xyz/api'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 2000)
  // store.commit('setLoading', false)
  return config
})
// axios.interceptors.request.use(config => {
//   config.params = {
//     ...config.params,
//     icode: 'A9F0B8B9A9F0B8B9A9F0B8B9A9F0B8B9'
//   }
//   return config
// })
// axios.get('/columns', { params: { name: '推荐' } }).then(res => {
//   console.log(res.data)
// })

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
