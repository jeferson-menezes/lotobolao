<template>
  <v-layout row justify-center>
    <v-icon @click="dialog = true">mdi-file-image</v-icon>
    <v-dialog v-model="dialog" max-width="500">
      <v-fade-transition mode="out-in">
        <v-card>
          <v-card-title class="justify-center">{{titulo}}</v-card-title>
          <v-img width="500" :src="url"  lazy-src="../../assets/images/ticket.svg"></v-img>
          <v-btn color="green darken-1" text="text" @click="dialog = false">Fechar</v-btn>
        </v-card>
      </v-fade-transition>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'MostraImagem',
  props: ['url', 'titulo'],
  data() {
    return {
      dialog: false
    };
  }
};
</script>
