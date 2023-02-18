<template>
  <div class="home">
    <header>
      <div class="container">
        <div class="row">
          <div class="col-5"><p class="mx-5">Title</p></div>
          <div class="col-3 text-center"><p>Date</p></div>
          <div class="col-4 text-center"><p>Status</p></div>
        </div>
      </div>
    </header>
    <div class="tasks">
      <task-item :tasks="this.tasks" />
    </div>
  </div>
</template>

<script>
import taskItem from "@/components/TaskItem";

export default {
  name: "HomeView",
  data: function () {
    return {
      tasks: [],
    };
  },
  components: {
    taskItem,
  },
  mounted() {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => ((this.tasks = data), console.log(data)));
  },
};
</script>

<style lang="scss" scoped>
$gray-color: #d4d4d4;
header {
  background-color: #444444;
  font-weight: bold;
  padding: 4px 0;
  p {
    color: $gray-color;
  }
}
</style>
