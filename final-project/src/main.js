import '@babel/polyfill'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'mdbvue/build/css/mdb.css'
import Vue from 'vue'
import VueFire from 'vuefire'
//import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import './firebaseApp'

Vue.use(VueFire)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')