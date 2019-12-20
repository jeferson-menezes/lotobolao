<template>
  <v-layout>
    <v-icon @click="dialog = true">mdi-horseshoe</v-icon>
    <v-dialog v-model="dialog">
      <v-card class="pa-4">
        <resultado-dezenas cor="warning" :dezenas="dezenas" />
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import ResultadoDezenas from './ResultadoDezenas';

export default {
  name: 'ExibePalpites',
  props: ['dezenas'],
  data: () => ({
    dialog: false
  }),
  components: {
    ResultadoDezenas
  }
};
</script>
