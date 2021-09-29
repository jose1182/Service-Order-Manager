import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import can from './helpers/can'
import axios from './axios'

Vue.config.productionTip = false
Vue.prototype.$can = can;


export const bus = new Vue();


let instance = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
})

axios.get('constants').then((response) => {
  
  Vue.prototype.$constants = response.data;

  instance.$mount('#app')
});


