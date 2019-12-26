<template>
  <div v-if="hasBolaoId()">
    <v-btn rounded color="pink" @click="limpaBolao()">
      <span class="font-weight-light">{{bolao.nome}}</span>
      <v-icon right dark>mdi-arrow-left-circle</v-icon>
    </v-btn>
  </div>
  <div v-else>
    <span>Selecione um bolão</span>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  name: 'UpdateBolao',
  data: () => ({
    drawer: null
  }),
  methods: {
    ...mapActions('game', ['ActionDescelecionaBolao']),
    ...mapGetters('game', ['hasBolaoId']),
    limpaBolao() {
      if (!this.hasBolaoId()) {
        this.$root.$emit('Notification::show', {
          tipo: 'warning',
          message: 'Não foi selecionado nenhum bolão!'
        });
        return;
      }
      this.ActionDescelecionaBolao();
      this.$router.push({ name: 'listGame' });
    }
  },
  computed: {
    ...mapState('game', ['bolao'])
  }
};
</script>
