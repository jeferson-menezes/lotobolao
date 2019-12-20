<template>
  <div class="spinner" v-if="visible">
    <v-progress-circular :size="50" color="blue" indeterminate></v-progress-circular>
  </div>
</template>
<script>
export default {
  name: 'LoadSpinner',
  data: () => ({
    visible: true
  }),
  created() {
    this.$root.$on('Spinner::show', () => {
      this.visible = true;
    });
    this.$root.$on('Spinner::hide', () => {
      this.visible = false;
    });
  }
};
</script>
<style scoped>
/* .spinner {
  top: 0 !important;
  bottom: 0 !important;
  right: 0 !important;
  left: 0 !important;
  z-index: 50000;
  position: absolute;
  width: 100vw !important;
  height: 100vh !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #32325db8;
  filter: blur(1px);
} */
</style>
