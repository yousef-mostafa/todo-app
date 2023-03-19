<template>
  <header id="list">
    <div class="container">
      <div class="row">
        <div class="col-5"><p class="mx-5">Title</p></div>
        <div class="col-3 col-md-2 text-center"><p>End Date</p></div>
        <div class="col-4 text-center"><p>Status</p></div>
        <div class="col-1 d-none d-md-block text-center">
          <p>
            <span @click.prevent="createNewTask()" style="cursor: pointer"
              >+</span
            >
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderList",
  methods: {
    createNewTask() {
      let date = new Date();
      let newTask = {
        title: "new task",
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        statue: "to-do",
      };
      this.$emit("newTask", newTask);
    },
  },
};
</script>

<style lang="scss">
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
