<template>
  <div class="text-center">
    <span class="statue" @click="editStatue()">
      <span class="bg-blue" v-if="statue == 'to-do'">To do</span>
      <span class="bg-yellow" v-else-if="statue == 'in-progress'"
        >In progress</span
      >
      <span class="bg-green" v-else>Done</span>
    </span>
  </div>
</template>

<script>
export default {
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
}
</style>
