<template>
  <input
    type="text"
    class="title"
    :value="title"
    readonly
    @click="toggleReadonly($event.target, true)"
    @blur="
      toggleReadonly($event.target, false);
      editTitle($event.target.value);
    "
  />
</template>

<script>
export default {
  name: "taskTitle",
  props: ["title"],
  methods: {
    editTitle(value) {
      this.$emit("editTitle", value);
    },
    toggleReadonly: function (inputFelid, editMood) {
      editMood
        ? inputFelid.removeAttribute("readonly")
        : inputFelid.setAttribute("readonly", "readonly");
    },
  },
};
</script>

<style lang="scss">
.task {
  input {
    &:read-only {
      border: none;
      outline: none;
      background: none;
      color: black;
    }
  }
}
</style>
