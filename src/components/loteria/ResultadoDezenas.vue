<template>
  <v-layout >
    <v-flex >
      <v-btn class="title" :color="cor" fab v-for="d in dezenas" :key="d">{{d}}</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'ResultadoDezenas',
  props: ['dezenas', 'cor']
};
</script>
