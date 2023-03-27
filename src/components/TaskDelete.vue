<template>
  <div class="delete">
    <i
      class="bi bi-trash-fill"
      @click="
        deleteHandel(`Do you want to delete this task?! → title : ${title}`)
      "
    ></i>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    deleteHandel(msg) {
      this.$emit("deleteHandel", msg);
    },
  },
};
</script>

<style lang="scss">
@import "scss/global.scss";
.task {
  .date {
    &__text {
      border: 1px solid $gray-color;
      padding: 4px 8px;
      font-weight: 600;
      border-radius: 6px;
    }
  }
}
</style>
