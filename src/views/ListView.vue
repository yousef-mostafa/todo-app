<template>
  <div class="home">
    <popUp
      :popupMsg="Msg"
      :id="wantedID"
      @assignFlag="popupFlag"
      :style="this.togglePopUp"
    ></popUp>
    <v-date-picker
      @dayclick="onDayClick"
      v-model="day"
      :id="wantedID"
      style="position: absolute; z-index: 1000"
      :style="calenderPos + toggleCalender"
    ></v-date-picker>
    <headerList @newTask="addTask"></headerList>
    <div class="tasks">
      <div class="container" v-if="tasks.length">
        <taskList
          :task="task"
          v-for="task in tasks"
          :key="task.id"
          @calenderData="calenderHandel"
          @WantedID="setWantedID"
          @msg="assignMsg"
          @togglePopUp="togglePopUp = toggleProb(togglePopUp)"
        ></taskList>
      </div>
      <div class="container" v-else>
        <h3 class="text-center my-5">There is no tasks</h3>
      </div>
    </div>
  </div>
</template>

<script>
import popUp from "@/components/PopUp.vue";
import headerList from "@/components/HeaderList.vue";
import taskList from "@/components/TaskList.vue";
export default {
  name: "ListView",
  data: function () {
    return {
      Msg: "",
      wantedID: Number,
      togglePopUp: "display:none",
      toggleCalender: "display: none",
      calenderPos: "",
      day: new Date(),
    };
  },
  components: {
    popUp,
    headerList,
    taskList,
  },
  computed: {
    tasks: {
      get() {
        return this.$store.getters.getTasks;
      },
    },
  },
  methods: {
    addTask(newTask) {
      this.$store.dispatch("addTaskDB", newTask);
    },
    calenderHandel(payload) {
      this.setCalenderPos(payload.event);
      this.setCalenderDate(payload.date);
      this.toggleCalender = this.toggleProb(this.toggleCalender);
    },
    assignMsg: function (msg) {
      this.Msg = msg;
    },
    setWantedID(id) {
      this.wantedID = id;
    },
    deleteTask: function (id) {
      this.$store.dispatch("deleteTaskDB", id);
    },
    popupFlag: function (flag, id) {
      if (flag) {
        this.deleteTask(id);
      }
      this.togglePopUp = this.toggleProb(this.togglePopUp);
    },
    toggleProb: function (prob) {
      return prob == "display:block" ? "display:none" : "display:block";
    },
    onDayClick(selectedDay) {
      this.day = selectedDay;
      this.changeDate(selectedDay.id);
    },
    setCalenderDate: function (dateID) {
      this.day = new Date(dateID);
    },
    changeDate: function (date) {
      let wantedIndex = this.findElementIndex();
      this.$store.dispatch("changeDate", { wantedIndex, date });
    },
    findElementIndex: function () {
      let wantedIndex = this.tasks.findIndex(
        (task) => task.id === this.wantedID
      );
      return wantedIndex;
    },
    setCalenderPos: function (e) {
      let target = e.target;
      this.calenderPos = `
      top:${target.offsetTop + target.offsetHeight}px;
      left:${target.offsetLeft - target.offsetWidth}px;`;
    },
  },
};
</script>
