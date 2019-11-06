import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
