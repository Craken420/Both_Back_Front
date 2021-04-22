import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
