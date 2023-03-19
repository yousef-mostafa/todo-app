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
    <headerList @newTask="addTaskToScreen"></headerList>
    <div class="tasks">
      <div class="container" v-if="tasks.length">
        <div
          class="tasks__task"
          :tasks="tasks"
          v-for="task in tasks"
          :key="task.id"
        >
          <div class="row align-items-center">
            <div class="col-5">
              <div class="d-flex gap-3 align-items-center">
                <div
                  class="check"
                  :class="task.statue"
                  @click="
                    task.statue = changeStatue(task.statue);
                    changeDB(task);
                  "
                ></div>
                <input
                  type="text"
                  class="title"
                  :value="task.title"
                  readonly
                  @click="toggleReadonly($event.target, true)"
                  @blur="
                    toggleReadonly($event.target, false);
                    task.title = $event.target.value;
                    changeDB(task);
                  "
                />
              </div>
            </div>
            <div class="col-3 col-md-2">
              <div class="text-center date">
                <span
                  class="date__text"
                  v-text="task.date"
                  @click="
                    setCalenderPos($event);
                    setCalenderDate(task.date);
                    setWantedID(task.id);
                    toggleCalender = toggleProb(toggleCalender);
                  "
                >
                </span>
              </div>
            </div>
            <div class="col-4">
              <p
                class="statue"
                @click="
                  task.statue = changeStatue(task.statue);
                  changeDB(task);
                "
              >
                <span class="bg-blue" v-if="task.statue == 'to-do'">To do</span>
                <span class="bg-yellow" v-else-if="task.statue == 'in-progress'"
                  >In progress</span
                >
                <span class="bg-green" v-else>Done</span>
              </p>
            </div>
            <div class="col-1 d-none d-md-block text-center">
              <div class="delete">
                <i
                  class="bi bi-trash-fill"
                  @click="
                    setWantedID(task.id);
                    sendMsg(
                      `Do you want to delete this task?!
                      title : ${task.title}`
                    );
                    togglePopUp = toggleProb(togglePopUp);
                  "
                ></i>
              </div>
            </div>
          </div>
        </div>
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
export default {
  name: "ListView",
  data: function () {
    return {
      url: this.$store.state.url,
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
  },
  computed: {
    tasks: {
      get() {
        return this.$store.getters.getTasks;
      },
    },
  },
  methods: {
    changeDB: function (task) {
      this.$store.dispatch("changeDB", task);
    },
    changeStatue: function (statue) {
      switch (statue) {
        case "to-do":
          statue = "in-progress";
          break;
        case "in-progress":
          statue = "done";
          break;
        case "done":
          statue = "to-do";
          break;
        default:
          break;
      }
      return statue;
    },
    addTask(newTask) {
      this.$store.dispatch("addTaskDB", newTask);
    },
    toggleReadonly: function (inputFelid, editMood) {
      editMood
        ? inputFelid.removeAttribute("readonly")
        : inputFelid.setAttribute("readonly", "readonly");
    },
    sendMsg: function (msg) {
      this.Msg = msg;
    },
    setWantedID: function (id) {
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
      this.changeDate(this.day.id);
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

<style lang="scss">
$green-color: #1cc96d;
$gray-color: #d4d4d4;
$yellow-color: #e59b1e;
$blue-color: #55bdf6;

.bg-green {
  background-color: $green-color;
}
.bg-yellow {
  background-color: $yellow-color;
}
.bg-blue {
  background-color: $blue-color;
}
p {
  margin: 0 !important;
}
header {
  background-color: #444444;
  font-weight: bold;
  padding: 4px 0;
  p {
    color: $gray-color;
  }
}

.tasks {
  &__task {
    padding: 12px 0;
    border-bottom: 1px solid rgba($gray-color, 0.8);
    .check {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      cursor: pointer;
      &.in-progress {
        border: 2px solid $yellow-color;
        background-color: $yellow-color;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          background-color: rgba(white, 0.8);
          height: 26px;
          width: 13px;
          inset: 0;
          border-radius: 1rem 0 0 1rem;
        }
      }
      &.to-do {
        border: 2px solid #888;
      }
      &.done {
        border: 2px solid $green-color;
        background-color: $green-color;
        position: relative;
        &::after {
          content: "\2713";
          position: absolute;
          color: white;
          font-weight: bolder;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    input {
      &:read-only {
        border: none;
        outline: none;
        background: none;
        color: black;
      }
    }
    .date {
      &__text {
        border: 1px solid $gray-color;
        padding: 4px 8px;
        font-weight: 600;
        border-radius: 6px;
      }
    }
    .statue {
      text-align: center;
      color: white;
      font-weight: 500;
      cursor: pointer;
      span {
        border-radius: 15px;
        display: inline-block;
        width: 35%;
        @media (max-width: 576px) {
          width: 100%;
        }
        @media (min-width: 576px) and (max-width: 992px) {
          width: 50%;
        }
      }
    }
    .delete {
      .bi-trash-fill {
        cursor: pointer;
        color: #888;
        &:hover {
          color: #dc3545;
        }
      }
    }
  }
}
</style>
