<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import navbar from "@/components/NavBar";

export default {
  name: "app",
  components: {
    navbar,
  },
  created() {
    this.$store.dispatch("getAllData");
  },
};
</script>
