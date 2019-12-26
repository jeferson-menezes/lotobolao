<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title>Participantes do bolão</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="participantes"
          class="elevation-1"
        >
          <template v-slot:item.pago="{item}">
            <div
              :class="{'TEXT--PAGA' : item.pago, 'TEXT--FECHADA' : !item.pago}"
            >{{ item.pago ? 'pago':'devendo' }}</div>
          </template>
          <template v-slot:item.dezenas="{item}">
            <exibe-palpites v-if="temDezenas(item.dezenas)" :dezenas="item.dezenas"></exibe-palpites>
          </template>
          <template v-slot:item.arquivos="{item}">
            <v-layout row wrap>
              <v-flex v-for="(img, i) in item.arquivos" :key="i" xs6>
                <mostra-imagem :url="img.url" titulo="Comprovante de pagamento"></mostra-imagem>
              </v-flex>
            </v-layout>
          </template>
          <template v-slot:item.action="{item}">
            <v-layout row wrap>
              <v-flex>
                <v-icon @click="addDezenas(item.id)">fa-th</v-icon>
              </v-flex>
              <v-flex>
                <importar-imagens :participante="item"></importar-imagens>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import MostraImagem from '../../components/loteria/MostraImagem';
import ImportarImagens from '../../components/loteria/ImportarImagens';
import ExibePalpites from '../../components/loteria/ExibePalpites';

export default {
  name: 'ListPeople',
  components: {
    MostraImagem,
    ImportarImagens,
    ExibePalpites
  },
  data: () => ({
    headers: [
      {
        text: 'Nome',
        align: 'left',
        value: 'nome'
      },
      { text: 'Cotas', value: 'parte' },
      { text: 'Pago', value: 'pago', sortable: false },
      { text: 'Palpites', value: 'dezenas', sortable: false },
      { text: 'Arquivos', value: 'arquivos', sortable: false, align: 'left' },
      { text: 'Ações', value: 'action', sortable: false }
    ]
  }),
  methods: {
    ...mapActions('people', ['ActionListParticipantes']),
    addDezenas(value) {
      this.$router.push({ name: 'hint', params: { id: value } });
    },
    temDezenas(atribute) {
      if (atribute === undefined) {
        return false;
      }
      return true;
    }
  },
  computed: {
    ...mapState('people', ['participantes']),
    ...mapState('game', ['bolao'])
  },
  mounted() {
    this.ActionListParticipantes(this.bolao.id);
  }
};
</script>
