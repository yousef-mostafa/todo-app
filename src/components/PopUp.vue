<template>
  <div class="popup-window">
    <div class="popup">
      <button class="btn-close" @click="closePopup()"></button>
      <div class="text-center mb-4">
        <i class="bi bi-info-circle"></i>
      </div>
      <p v-text="popupMsg"></p>
      <div class="d-flex gap-3 justify-content-center">
        <button class="btn btn-secondary w-50" @click="assignFlag(false)">
          No
        </button>
        <button class="btn btn-danger w-50" @click="assignFlag(true)">
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: ["popupMsg", "id"],
  methods: {
    assignFlag(value) {
      this.$emit("assignFlag", value, this.id);
    },
    closePopup: function () {
      document.querySelector(".popup-window").style.display = "none";
    },
  },
};
</script>

<style lang="scss" scooped>
.popup-window {
  position: absolute;
  background-color: rgba(gray, 0.8);
  z-index: 1000;
  inset: 0;
  height: 100vh;
}
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  padding: 16px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 10px #666;
  .bi-info-circle {
    font-size: 64px;
    color: #e59b1e;
  }
  p {
    margin-bottom: 32px !important;
  }
}
</style>
