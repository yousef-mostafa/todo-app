<template>
  <div class="home">
    <popUp
      :popupMsg="Msg"
      :id="wantedID"
      @assignFlag="flagValue"
      :style="this.togglePopUp"
    ></popUp>
    <!-- <v-date-picker
      @dayclick="onDayClick"
      v-model="day"
      :id="wantedID"
      style="position: absolute; z-index: 1000"
      :style="calenderPos + toggleCalender"
    ></v-date-picker> -->
    <header>
      <div class="container">
        <div class="row">
          <div class="col-5"><p class="mx-5">Title</p></div>
          <div class="col-3 col-md-2 text-center"><p>Ending Date</p></div>
          <div class="col-4 text-center"><p>Status</p></div>
          <div class="col-1 d-none d-md-block text-center">
            <p @click="addTask()">+</p>
          </div>
        </div>
      </div>
    </header>
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
                  @click="v - date - picker"
                >
                </span>
                <v-date-picker
                  @dayclick="onDayClick"
                  v-model="day"
                  :id="wantedID"
                  style="
                    position: absolute;
                    z-index: 1000;
                    inset: 0;
                    display: none;
                  "
                ></v-date-picker>
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
                    sendMsg(
                      `Do you want to delete this task?!
                      title : ${task.title}`
                    );
                    togglePopUp = toggleProb(togglePopUp);
                    setWantedID(task.id);
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
export default {
  name: "ListView",
  data: function () {
    return {
      url: "http://localhost:3000/tasks",
      tasks: [],
      Msg: "",
      wantedID: Number,
      togglePopUp: "display:none",
      toggleCalender: "display: none",
      calenderPos: "",
      currentDateBox: false,
      day: new Date(),
    };
  },
  components: {
    popUp,
  },

  mounted() {
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => (this.tasks = data));
  },
  methods: {
    onDayClick(selectedDay) {
      this.day = selectedDay;
      console.log(selectedDay);
    },
    changeDB: async function (task) {
      console.log("changeDB");
      await fetch(`${this.url}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          date: task.date,
          statue: task.statue,
        }),
      }).then((res) => res.json());
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
    addTask: async function (newTask) {
      await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask.title,
          date: newTask.date,
          statue: newTask.statue,
        }),
      });
      this.tasks.unshift(newTask);
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
      fetch(`${this.url}/${id}`, {
        method: "DELETE",
      });
      this.tasks = this.tasks.filter((task) => task.id != id);
    },
    flagValue: function (flag, id) {
      if (flag) {
        this.deleteTask(id);
      }
      this.togglePopUp = this.toggleProb(this.togglePopUp);
    },
    toggleProb: function (prop) {
      return prop == "display:block" ? "display:none" : "display:block";
    },
    handleCalender: function (e) {
      // if this date box the same hide calender if else change calender position
      if (this.currentDateBox) {
        if (this.currentDateBox == e.target) {
          this.toggleCalender = this.toggleProb(this.toggleCalender);
        } else {
          this.setCalenderPos(e);
          this.currentDateBox = e.target;
        }
      } else {
        this.setCalenderPos(e);
        this.toggleCalender = this.toggleProb(this.toggleCalender);
        this.currentDateBox = e.target;
      }
    },
    setCalenderPos: function (e) {
      let target = e.target;
      this.calenderPos = `
      top:${target.offsetTop + target.offsetHeight}px;
      left:${12 + target.offsetLeft - target.parentElement.offsetWidth / 2}px;`;
      console.log(e);
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
        display: inline-block;
        width: 45%;
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
