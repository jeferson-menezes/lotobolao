<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="time"
        label="Hora"
        prepend-icon="mdi-clock"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker v-if="menu" @input="getHora" v-model="time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    time: '',
    menu: false
  }),
  methods: {
    getHora() {
      this.$emit('hora-selecionada', this.time);
    }
  },
  created() {
    this.getHora();
  }
};
</script>
