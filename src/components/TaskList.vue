<template>
  <div class="task">
    <div class="row align-items-center">
      <div class="col-5">
        <div class="d-flex gap-3 align-items-center">
          <div
            class="check"
            :class="task.statue"
            @click="
              editedTask.statue = changeStatue(task.statue);
              changeDB(editedTask);
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
              editedTask.title = $event.target.value;
              changeDB(editedTask);
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
              calenderData($event, task.date);
              sendWantedID(task.id);
            "
          >
          </span>
        </div>
      </div>
      <div class="col-4">
        <p
          class="statue"
          @click="
            editedTask.statue = changeStatue(task.statue);
            changeDB(editedTask);
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
              sendWantedID(task.id);
              sendMsg(
                `Do you want to delete this task?! → title : ${task.title}`
              );
              togglePopUp();
            "
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  data: function () {
    return {
      editedTask: this.task,
      wantedID: Number,
    };
  },
  props: ["task"],
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
    toggleReadonly: function (inputFelid, editMood) {
      editMood
        ? inputFelid.removeAttribute("readonly")
        : inputFelid.setAttribute("readonly", "readonly");
    },
    sendMsg: function (msg) {
      this.$emit("msg", msg);
    },
    sendWantedID: function (id) {
      this.$emit("WantedID", id);
    },
    calenderData(event, date) {
      this.$emit("calenderData", { event, date });
    },
    deleteTask: function (id) {
      this.$store.dispatch("deleteTaskDB", id);
    },
    togglePopUp() {
      this.$emit("togglePopUp");
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

.task {
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
</style>
