<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    @change="getData()"
  >
    <template v-slot:activator="{ on }">
      <v-text-field v-model="date" label="Data" prepend-icon="mdi-calendar-blank" readonly v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="getData"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false
  }),
  methods: {
    getData() {
      this.menu = false;
      this.$emit('data-selecionada', this.date);
    }
  },
  created() {
    this.getData();
  }
};
</script>
