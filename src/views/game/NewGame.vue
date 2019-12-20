<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex>
        <v-card class="elevation-1">
          <v-form @submit.prevent="submit()">
            <v-card-title class="headline">Cadastrar novo bolão</v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="bolao.nome" label="Nome do bolão" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="bolao.concurso" label="Concurso n°" type="number"></v-text-field>
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field
                      v-model="bolao.dezenas"
                      label="Quantas Dezenas"
                      type="number"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs6>
                    <date-picker @data-selecionada="setData" />
                  </v-flex>
                  <v-flex xs6>
                    <time-picker @hora-selecionada="setHora" />
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      v-model="bolao.loteria"
                      :items="loterias"
                      item-text="nome"
                      item-value="id"
                      label="Loteria do bolão"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      v-model="bolao.observacao"
                      rows="2"
                      label="Descrição e observações"
                    ></v-textarea>
                  </v-flex>

                  <v-flex xs6>
                    <v-switch v-model="bolao.unica" label="É cota única?"></v-switch>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      @change="convertValor()"
                      v-model="bolao.valor"
                      label="Valor"
                      type="text"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-btn type="submit" color="primary">Criar</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { loterias, getLoteria } from '../../js/data/jogos';
import { real, dolar } from '../../js/helper/currency';
import DatePicker from '../../components/global/DatePicker';
import TimePicker from '../../components/global/TimePicker';

export default {
  name: 'NewGame',
  data: () => ({
    bolao: {
      nome: '',
      concurso: 0,
      loteria: 0,
      observacao: '',
      dezenas: 0,
      valor: '',
      unica: false,
      data: '',
      hora: ''
    }
  }),
  computed: {
    loterias() {
      return loterias();
    }
  },
  methods: {
    ...mapActions('game', ['ActionAddBolao']),
    submit() {
      if (!this.valid()) {
        this.$root.$emit('Notification::show', {
          tipo: 'warning',
          message: 'Todos os campos são obrigatórios !'
        });
        return;
      }

      this.bolao.valor = dolar(this.bolao.valor);
      this.bolao.loteria = getLoteria(this.bolao.loteria);

      this.ActionAddBolao(this.bolao)
        .then(res => {
          this.$root.$emit('Notification::show', {
            tipo: 'success',
            message: 'Adicionado com sucesso !'
          });
        })
        .catch(err => {
          console.log(err);

          this.$root.$emit('Notification::show', {
            tipo: 'error',
            message: 'Houve um erro !'
          });
        });

      this.limpa();
    },
    valid() {
      if (
        this.bolao.nome &&
        this.bolao.concurso &&
        this.bolao.loteria &&
        this.bolao.observacao &&
        this.bolao.dezenas &&
        this.bolao.valor &&
        this.bolao.data &&
        this.bolao.hora
      ) {
        return true;
      }
      return false;
    },
    limpa() {
      this.bolao.nome = '';
      this.bolao.concurso = 0;
      this.bolao.loteria = '';
      this.bolao.observacao = '';
      this.bolao.dezenas = 0;
      this.bolao.valor = '';
      this.bolao.unica = false;
      this.bolao.data = '';
      this.bolao.hora = '';
    },
    convertValor() {
      console.log(this.bolao.valor);
      this.bolao.valor = real(this.bolao.valor);
    },
    setData(payload) {
      this.bolao.data = payload;
    },
    setHora(payload) {
      this.bolao.hora = payload;
    }
  },
  components: {
    DatePicker,
    TimePicker
  },
  mounted() {}
};
</script>
