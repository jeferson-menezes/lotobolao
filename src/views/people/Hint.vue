<template>
  <v-container>
    <v-layout row wrap ma-5>
      <v-flex xs12>
        <title>Cadastrar palpites</title>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title
            primary-title
          >{{participante.nome || 'Não foi selecionado um participante !' }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-btn-toggle color="primary" :max="bolao.dezenas" dense v-model="toggle_dezenas" multiple>
        <v-row align="center" justify="center">
          <template v-for="d in dezenas">
            <v-col :key="d.dezena">
              <v-btn dark>{{d.texto}}</v-btn>
            </v-col>
            <v-responsive v-if="d.dezena % 10 === 0" :key="`width-${d.dezena - 10}`" width="100%"></v-responsive>
          </template>
        </v-row>
      </v-btn-toggle>
    </v-layout>

    <v-layout ma-5>
      <v-flex>
        <resultado-dezenas :dezenas="dezenasSelecionadas" cor="deep-orange darken-1"></resultado-dezenas>
      </v-flex>
    </v-layout>
    <v-layout ma-5>
      <v-flex>
        <v-col align="center" justify="center" cols="12">
          <v-btn :disabled="!selecionouTudo" @click="submit()" color="success">Salvar</v-btn>
        </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { getDezenasMega } from '../../js/data/jogos';
import ResultadoDezenas from '../../components/loteria/ResultadoDezenas';

export default {
  name: 'Hint',
  data: () => ({
    toggle_dezenas: [],
    selected_dezenas: [],
    idParte: undefined,
    enviar: false
  }),
  components: { ResultadoDezenas },
  computed: {
    ...mapState('people', ['participante']),
    ...mapState('game', ['bolao']),
    dezenas() {
      return getDezenasMega();
    },
    dezenasSelecionadas() {
      return this.updateSelect();
    },
    selecionouTudo() {
      return +this.bolao.dezenas === this.selected_dezenas.length;
    }
  },
  methods: {
    ...mapActions('people', ['ActionGetParticipanteForId', 'ActionAddDezenas']),
    submit() {
      if (!this.participante.id) {
        this.$root.$emit('Notification::show', {
          tipo: 'error',
          message: 'Não existe nenhum participante selecionado!'
        });
        return;
      }

      this.ActionAddDezenas({
        dezenas: this.selected_dezenas,
        id: this.participante.id
      })
        .then(res => {
          this.$root.$emit('Notification::show', {
            tipo: 'success',
            message: 'Palpite cadastrado com sucesso!'
          });

          this.$router.push({ name: 'home' });
        })
        .catch(err => {
          console.log(err);
          this.$root.$emit('Notification::show', {
            tipo: 'error',
            message: 'Houve um erro ao adicionar o palpite!'
          });
        });
    },
    setId() {
      return this.$route.params.id;
    },
    updateSelect() {
      this.selected_dezenas = this.toggle_dezenas.map(e => e + 1);
      return this.selected_dezenas;
    }
  },
  mounted() {
    this.idParte = this.setId();
    this.ActionGetParticipanteForId(this.idParte);
    this.$root.$emit('Notification::show', {
      tipo: 'info',
      message: 'Você pode selecionar as dezenas que serão sorteadas!'
    });
  }
};
</script>
<style scoped>
.col {
  flex-grow: 0 !important;
  padding: 0;
}
</style>
