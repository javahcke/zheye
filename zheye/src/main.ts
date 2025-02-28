import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://api.vikingship.xyz/api'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  // store.commit('setLoading', false)
  return config
}, err => {
  console.log(err.response)
  const { error } = err.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
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
