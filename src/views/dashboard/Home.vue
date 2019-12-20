<template>
  <v-container grid-list-md>
    <v-layout row wrap mb-2>
      <v-flex xs12>
        <v-card outlined tile>
          <v-card-title class="justify-center headline">Informações do bolão {{bolao.nome}}</v-card-title>
          <v-card-text>
            <v-list-item three-line centered>
              <v-list-item-content>
                <v-list-item-title>Sorteio em {{bolao.data | moment("DD/MM/YYYY")}} {{bolao.hora}}</v-list-item-title>
                <v-list-item-subtitle
                  v-if="bolao.unica"
                >{{'Aposta única de ' + real(bolao.valor)}} {{" de " + bolao.dezenas + " dezenas"}}</v-list-item-subtitle>
                <v-list-item-subtitle>
                  <strong>Descrição:</strong>
                  {{bolao.observacao}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
          <v-card-title>Dezenas mais escolhidas nos palpites</v-card-title>
          <v-card-actions>
            <resultado-dezenas cor="primary" :dezenas="dezenas" />
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap mb-2>
      <v-flex xs12>
        <v-card outlined tile>
          <v-card-title
            class="justify-center headline"
          >Informações do sorteio concurso {{bolao.concurso}}</v-card-title>
          <template v-if="hasConcurso()">
            <v-card-text>
              <v-list-item three-line centered>
                <v-list-item-content>
                  <v-list-item-title>Sorteio em {{concurso.cidade}} {{concurso.data}}</v-list-item-title>
                  <v-list-item-subtitle>{{'Arrecadação total de ' + concurso.arrecadacao_total}}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{'Ganhadores na sena '+ concurso.premiacao.sena.ganhadores}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </template>
          <template v-else>
            <v-card-text class="d-flex justify-center">Não foi localizado sorteio desse concurso</v-card-text>
          </template>
          <v-card-actions>
            <resultado-dezenas cor="success" :dezenas="concurso.dezenas" />
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap mb-2>
      <v-flex xs12>
        <v-card >
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title class="justify-center headline">Resultado</v-card-title>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6>
              <v-card-title>Dezenas acertadas</v-card-title>
              <v-card-text>
                <resultado-dezenas cor="success" :dezenas="acertados(dezenas || [], concurso.dezenas || [])" />
              </v-card-text>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6>
              <v-card-title>Dezenas erradas</v-card-title>
              <v-card-text>
                <resultado-dezenas cor="error" :dezenas="errados(dezenas || [], concurso.dezenas|| [])" />
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ResultadoDezenas from '../../components/loteria/ResultadoDezenas';
import { real } from '../../js/helper/currency';
import { acertos, erros } from '../../js/helper/loteria';

export default {
  name: 'Home',
  components: {
    ResultadoDezenas
  },
  methods: {
    ...mapActions('dashboard', ['ActionResultadoConcurso']),
    ...mapActions('people', ['ActionListParticipantes']),
    ...mapGetters('dashboard', ['hasConcurso']),
    real(valor) {
      return real(valor);
    },
    acertados(jogo, result) {
      if (jogo.length && result.length) {
        return acertos(jogo, result);
      }
      return [];
    },
    errados(jogo, result) {
      if (jogo.length && result.length) {
        return erros(jogo, result);
      }
      return [];
    }
  },
  computed: {
    ...mapState('dashboard', ['concurso']),
    ...mapState('game', ['bolao']),
    ...mapState('people', ['dezenas'])
  },
  mounted() {
    this.ActionResultadoConcurso(this.bolao.concurso);
    this.ActionListParticipantes(this.bolao.id);
  }
};
</script>
