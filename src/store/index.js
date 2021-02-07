import Vue from 'vue';
import Vuex from 'vuex';
import auth from "./auth.js";
import error from "./error";
import employee from "./employee.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    error,
    employee
  }
})