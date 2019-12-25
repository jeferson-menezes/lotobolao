<template>
  <v-container>
    <v-layout row justify-space-around>
      <v-flex xs12 sm10 md5 lg6 xl4 class="ma-1" v-for="(bolao, i) in boloes" :key="i">
        <v-card flet tile @click="selectBolao(bolao)">
          <v-card-title primary-title class="justify-center title">
            {{bolao.nome}}
            <v-chip class="ma-2" color="red" text-color="white">{{'Concurso: ' + bolao.concurso}}</v-chip>
          </v-card-title>
          <v-card-subtitle>
            {{bolao.unica ? 'Cota única com ' + bolao.dezenas + ' dezenas ':''}}
            <v-chip>{{ convertValor(bolao.valor)}}</v-chip>
          </v-card-subtitle>
          <v-card-text>
            <p class="text-justify">{{'Detalhes: ' + bolao.observacao}}</p>
          </v-card-text>
          <v-card-actions>
            <v-chip label class="ma-2" color="primary" text-color="white">{{bolao.loteria.nome}}</v-chip>
            <v-chip
              label
              class="ma-2"
              color="blue"
              text-color="white"
            >{{'Data sorteio: ' + bolao.data | moment("DD/MM/YYYY")}}{{' ' + bolao.hora }}</v-chip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { real } from '../../js/helper/currency';

export default {
  name: 'ListGame',
  data: () => ({}),
  methods: {
    ...mapActions('game', ['ActionListaBoloes', 'ActionSelecionaBolao']),
    selectBolao(bolao) {
      this.ActionSelecionaBolao(bolao);
      this.$router.push({ name: 'home' });
    },
    convertValor(value) {
      return real(value);
    }
  },
  computed: {
    ...mapState('game', ['boloes'])
  },
  mounted() {
    this.ActionListaBoloes();
  }
};
</script>
