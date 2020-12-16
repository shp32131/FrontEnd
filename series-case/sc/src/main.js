import Vue from 'vue'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
