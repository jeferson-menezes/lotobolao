<template>
  <v-container>
    <v-layout row wrap mb-2>
      <v-flex xs12>
        <title>Cadastrar palpites</title>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title
            justif="center"
            primary-title
          >{{participante.nome || 'Não foi selecionado um participante !' }}</v-card-title>
          <v-card-subtitle>Informe as suas dezenas e clique em salvar.</v-card-subtitle>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-btn-toggle :max="bolao.dezenas" dense v-model="toggle_dezenas" multiple>
        <v-row align="center" justify="center">
          <template v-for="d in dezenas">
            <v-col :key="d.texto">
              <v-btn>{{d.texto }}</v-btn>
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
      <v-flex v-if="deixaAlterar()">
        <v-col align="center" justify="center" cols="12">
          <v-btn :disabled="!selecionouTudo" @click="submit()" color="success">Salvar</v-btn>
        </v-col>
      </v-flex>
      <v-flex v-else>
        <span class="red--text">Não é mais possível alterar as dezenas, o jogo já foi finalizado</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { getDezenasMega, getDezenasTexto } from '../../js/data/jogos';
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
    ...mapGetters('people', ['palpitou']),
    submit() {
      if (!this.participante.id) {
        this.$root.$emit('Notification::show', {
          tipo: 'error',
          message: 'Não existe nenhum participante selecionado!'
        });
        return;
      }
      this.$root.$emit('Loading::show');
      this.ActionAddDezenas({
        dezenas: this.selected_dezenas,
        id: this.participante.id
      })
        .then(res => {
          this.$root.$emit('Loading::hide');
          this.$root.$emit('Notification::show', {
            tipo: 'success',
            message: 'Palpite cadastrado com sucesso!'
          });

          this.$router.push({ name: 'home' });
        })
        .catch(err => {
          console.log(err);
          this.$root.$emit('Loading::hide');
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
      this.selected_dezenas = getDezenasTexto(
        this.toggle_dezenas.map(e => e + 1)
      );
      return this.selected_dezenas;
    },
    deixaAlterar() {
      if (this.bolao.inativo && this.palpitou) {
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.idParte = this.setId();
    this.$root.$emit('Loading::show');
    this.ActionGetParticipanteForId(this.idParte)
      .then(e => {
        this.$root.$emit('Loading::hide');
      })
      .catch(err => {
        console.log(err);
        this.$root.$emit('Loading::hide');
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
