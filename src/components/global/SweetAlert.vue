<template>
  <div class="alert">
    <v-alert
      dense
      :value="show"
      :type="tipo"
      border="left"
    >{{ message }}</v-alert>
  </div>
</template>

<script>
/**
 * warning
 * info
 * success
 * error
 */
export default {
  name: 'SweetAlert',
  data: () => ({
    show: false,
    message: '',
    tipo: 'error'
  }),
  created() {
    this.$root.$on('Notification::show', payload => {
      this.show = true;
      this.tipo = payload.tipo;
      this.message = payload.message;

      setTimeout(() => {
        this.close();
      }, payload.tipeout || 5000);
    });
  },
  methods: {
    close() {
      this.message = '';
      this.type = 'danger';
      this.show = false;
    }
  }
};
</script>

<style scoped>
.alert {
  position: fixed;
  z-index: 10000;
  left: 40px;
  bottom: 40px;
}
</style>
