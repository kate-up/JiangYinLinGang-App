// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from '../static/js/echarts'
import Cube from 'cube-ui'
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(Cube)
axios.defaults.baseURL = '/api' //关键代码
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  data() {
    return {
      // job为0是员工  job为1是领导
      // job: null,
      job: 1,
      userid: "",
      username: ""
    };
  }
});
