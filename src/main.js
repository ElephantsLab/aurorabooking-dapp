import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import router from "./router/index";
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
