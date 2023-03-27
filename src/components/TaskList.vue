<template>
  <div class="task">
    <div class="row align-items-center">
      <div class="col-5">
        <div class="d-flex gap-3 align-items-center">
          <taskCheck :statue="task.statue" @editStatue="editStatue"></taskCheck>
          <taskTitle :title="task.title" @editTitle="editTitle"></taskTitle>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <taskDate :date="task.date" @calenderHandel="calenderHandel"></taskDate>
      </div>
      <div class="col-4">
        <taskStatue :statue="task.statue" @editStatue="editStatue"></taskStatue>
      </div>
      <div class="col-1 d-none d-md-block text-center">
        <taskDelete
          :title="task.title"
          @deleteHandel="deleteHandel"
        ></taskDelete>
      </div>
    </div>
  </div>
</template>

<script>
import taskCheck from "@/components/TaskCheck.vue";
import taskTitle from "@/components/TaskTitle.vue";
import taskDate from "@/components/TaskDate.vue";
import taskStatue from "@/components/TaskStatue.vue";
import taskDelete from "@/components/TaskDelete.vue";
export default {
  name: "TaskList",
  data: function () {
    return {
      editedTask: this.task,
      wantedID: Number,
    };
  },
  props: ["task"],
  components: {
    taskCheck,
    taskTitle,
    taskDate,
    taskStatue,
    taskDelete,
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
    editStatue() {
      this.editedTask.statue = this.changeStatue(this.task.statue);
      this.changeDB(this.editedTask);
    },
    editTitle(value) {
      this.editedTask.title = value;
      this.changeDB(this.editedTask);
    },
    deleteHandel(msg) {
      this.sendWantedID(this.task.id);
      this.sendMsg(msg);
      this.togglePopUp();
    },
    sendMsg: function (msg) {
      this.$emit("msg", msg);
    },
    sendWantedID: function (id) {
      this.$emit("WantedID", id);
    },
    calenderHandel(payload) {
      this.$emit("calenderData", payload);
      this.sendWantedID(this.task.id);
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
@import "scss/global.scss";
.task {
  padding: 12px 0;
  border-bottom: 1px solid rgba($gray-color, 0.8);
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
