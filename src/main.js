import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://localhost:3000";

//添加路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    let token = JSON.parse(localStorage.getItem("user") || `{}`).token;
    if (token) {
      next()
    } else {
      next("/login")
    }
  } else {
    next();
  }
})

Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
