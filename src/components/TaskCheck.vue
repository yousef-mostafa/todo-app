<template>
  <div class="check" :class="statue" @click="editStatue()"></div>
</template>

<script>
export default {
  name: "taskCheck",
  props: ["statue"],
  methods: {
    editStatue() {
      this.$emit("editStatue");
    },
  },
};
</script>

<style lang="scss">
@import "scss/global.scss";
.task {
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
}
</style>
