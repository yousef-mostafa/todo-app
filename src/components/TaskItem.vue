<template>
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
            <div class="check" :class="task.statue"></div>
            <p class="title" v-text="task.title"></p>
          </div>
        </div>
        <div class="col-3">
          <p class="date text-center">
            <span v-text="task.date"></span>
          </p>
        </div>
        <div class="col-4">
          <p class="statue">
            <span class="bg-blue" v-if="task.statue == 'to-do'">To do</span>
            <span class="bg-yellow" v-else-if="task.statue == 'in-progress'"
              >In progress</span
            >
            <span class="bg-green" v-else>Done</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <h3 class="text-center my-5">There is no tasks</h3>
  </div>
</template>

<script>
export default {
  name: "taskItem",
  props: ["tasks"],
};
</script>

<style lang="scss">
.bg-green {
  background-color: $green-color;
}
.bg-yellow {
  background-color: $yellow-color;
}
.bg-blue {
  background-color: $blue-color;
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
    .date {
      span {
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
  }
}
</style>
