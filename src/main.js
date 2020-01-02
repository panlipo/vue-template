// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

import Vue from 'vue'

import App from './App'

import router from './router'

import api from './utils/api'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)



// 将http挂载到vue的原型上
Vue.prototype.$http = api;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
