import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: "http://localhost:3000/tasks",
    tasks: [],
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    setData(state, tasks) {
      state.tasks = tasks.reverse();
      return state.tasks;
    },
    appendInFront(state, task) {
      return state.tasks.unshift(task);
    },
    deleteTaskScreen(state, id) {
      state.tasks = state.tasks.filter((task) => task.id != id);
    },
    changeDate(state, payload) {
      state.tasks[payload.wantedIndex].date = payload.date;
    },
    findElementIndex(state, wantedID) {
      let wantedIndex = state.tasks.findIndex((task) => task.id === wantedID);
      return wantedIndex;
    },
  },
  actions: {
    async getAllData(context) {
      return await fetch(context.state.url)
        .then((res) => res.json())
        .then((data) => context.commit("setData", data));
    },
    async changeDB(context, task) {
      console.log("changeDB");
      await fetch(`${context.state.url}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          date: task.date,
          statue: task.statue,
        }),
      });
    },
    async addTaskDB(context, newTask) {
      await fetch(context.state.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask.title,
          date: newTask.date,
          statue: newTask.statue,
        }),
      })
        .then((response) => response.json())
        .then((data) => context.commit("appendInFront", data));
    },
    async deleteTaskDB(context, id) {
      await fetch(`${context.state.url}/${id}`, {
        method: "DELETE",
      });
      context.commit("deleteTaskScreen", id);
    },
    changeDate(context, payload) {
      context.commit("changeDate", payload);
      context.dispatch("changeDB", context.state.tasks[payload.wantedIndex]);
    },
  },
  modules: {},
});
