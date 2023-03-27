<template>
  <div class="text-center date">
    <span
      class="date__text"
      v-text="date"
      @click="calenderHandel($event, date)"
    >
    </span>
  </div>
</template>

<script>
export default {
  props: ["date"],
  methods: {
    calenderHandel(event, date) {
      this.$emit("calenderHandel", { event, date });
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
