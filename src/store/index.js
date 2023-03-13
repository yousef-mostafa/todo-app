import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    APILink: "http://localhost:3000/tasks",
    tasks: [],
  },
  getters: {},
  mutations: {
    setData(state, tasks) {
      state.tasks = tasks.reverse();
    },
    appendInFront(state, task) {
      state.tasks.unshift(task);
    },
  },
  actions: {
    async getAllData(context) {
      return await fetch(context.state.APILink)
        .then((res) => res.json())
        .then((data) => context.commit("setData", data));
    },
  },
  modules: {},
});
