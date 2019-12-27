<template>
  <v-container grid-list-md>
    <v-layout row wrap mb-2>
      <v-flex xs12>
        <v-card outlined tile>
          <v-card-title class="justify-center title">Informações do bolão {{bolao.nome}}</v-card-title>
          <v-card-subtitle>Sorteio em {{bolao.data | moment("DD/MM/YYYY")}} {{bolao.hora}}</v-card-subtitle>
          <v-card-text>
            <p v-if="bolao.unica">
              <v-chip color="primary">{{'Aposta única de ' + real(bolao.valor)}}</v-chip>
              {{" de " + bolao.dezenas + " dezenas"}}
            </p>
            <p class="text-justify">
              <strong>Descrição:</strong>
              {{bolao.observacao}}
            </p>
            <p>
              <v-list subheader three-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Existem
                      <v-chip color="red">{{ numPessoas() }}</v-chip> pessoas participando
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip color="red">{{ numPalpitadas() }}</v-chip> já informaram os palpites das dezenas
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-chip color="red">{{ numPagos() }}</v-chip> já informaram ter pago
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      O valor é de
                      <v-chip color="red">{{ dividir() }}</v-chip> para cada participante
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </p>
          </v-card-text>
          <v-card-title class="justify-center subtitle-1">Dezenas mais escolhidas nos palpites</v-card-title>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex>
                <span class="font-weight-thin caption">por ordem de escolhas</span>
                <resultado-dezenas cor="warning" :dezenas="dezenas" />
              </v-flex>
              <v-flex>
                <span class="font-weight-thin caption">por ordem crescente</span>
                <resultado-dezenas cor="warning" :dezenas="sortAsc(dezenas)" />
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap mb-2>
      <v-flex xs12>
        <v-card outlined tile>
          <v-card-title
            class="justify-center title"
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
        <v-card>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title class="justify-center title">Resultado</v-card-title>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6>
              <v-card-title class="justify-center subtitle-1">Dezenas acertadas</v-card-title>
              <v-card-text>
                <resultado-dezenas
                  cor="success"
                  :dezenas="acertados(dezenas || [], concurso.dezenas || [])"
                />
              </v-card-text>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6>
              <v-card-title class="justify-center subtitle-1">Dezenas erradas</v-card-title>
              <v-card-text>
                <resultado-dezenas
                  cor="error"
                  :dezenas="errados(dezenas || [], concurso.dezenas|| [])"
                />
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
import { real, divide } from '../../js/helper/currency';
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
    ...mapGetters('people', ['numPessoas', 'numPalpitadas', 'numPagos']),

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
    },
    dividir() {
      return real(divide(this.bolao.valor, this.numPessoas()));
    },
    sortAsc(arr) {
      return [].concat(arr).sort();
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
