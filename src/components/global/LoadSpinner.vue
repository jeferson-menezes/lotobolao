<template>
  <v-dialog class="loading" v-model="visible" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        <span class="justify-center">Por favor espere...</span>
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  created() {
    this.$root.$on('Loading::show', () => {
      this.visible = true;
    });
    this.$root.$on('Loading::hide', () => {
      this.visible = false;
    });
  }
};
</script>

<style scoped>
.loading {
  top: 0 !important;
  right: 0 !important;
  position: absolute;
  display: flex;
}
</style>
