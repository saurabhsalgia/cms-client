import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.http.options.root = 'https://9e277f2253dd.ngrok.io/'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
