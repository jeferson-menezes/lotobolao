<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-form @submit.prevent="submit()">
            <v-card-title class="justify-center headline">Participar do bolão</v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="form.nome" label="Nome e sobrenome" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-switch v-model="form.pago" label="Já foi pago ?"></v-switch>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      v-model="form.parte"
                      label="Quantas partes do bolão?"
                      type="number"
                    ></v-text-field>
                  </v-flex>
                  <v-flex v-if="form.pago">
                    <selector-image folder="comprovante" @images-selecionadas="setImages" />
                  </v-flex>
                  <v-flex xs12>
                    <v-btn type="submit" color="primary">Participar</v-btn>
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
import { mapActions, mapState } from 'vuex';
import SelectorImage from '../../components/global/SelectorImage';

export default {
  name: 'EnterPeople',
  components: {
    SelectorImage
  },
  data: () => ({
    form: {
      nome: '',
      pago: false,
      parte: 1,
      arquivos: [],
      bolaoId: ''
    }
  }),
  methods: {
    ...mapActions('people', ['ActionEntrarNoBolao', 'ActionGetParticipante']),
    submit() {
      if (!this.valid()) {
        this.$root.$emit('Notification::show', {
          tipo: 'warning',
          message: 'O nome é obrigatório, a parte deve ser maior ou igual 1!'
        });
        return;
      }

      this.form.bolaoId = this.bolao.id;

      this.$root.$emit('Loading::show');
      this.ActionGetParticipante({ nome: this.form.nome, id: this.bolao.id })
        .then(res => {
          this.$root.$emit('Loading::hide');
          if (res.length) {
            this.$root.$emit('Notification::show', {
              tipo: 'warning',
              message: 'Já existe um participante com esse nome!'
            });
            return;
          }

          this.$root.$emit('Loading::show');

          this.ActionEntrarNoBolao(this.form)
            .then(res => {
              this.$root.$emit('Loading::hide');
              this.$root.$emit('Notification::show', {
                tipo: 'success',
                message: 'Participante adicionado com sucesso!'
              });
              this.limpaForm();
              this.$router.push({ name: 'hint', params: { id: res } });
            })
            .catch(err => {
              console.log(err);
              this.$root.$emit('Loading::hide');
              this.$root.$emit('Notification::show', {
                tipo: 'error',
                message: 'Houve um erro ao adicionar!'
              });
            });
        })
        .catch(err => {
          console.log(err);

          this.$root.$emit('Loading::hide');

          this.$root.$emit('Notification::show', {
            tipo: 'error',
            message: 'Erro ao verificar cadastro !'
          });
        });
    },
    setImages(payload) {
      this.form.arquivos = payload;
    },
    limpaForm() {
      this.form.nome = '';
      this.form.pago = false;
      this.form.parte = 1;
      this.form.bolaoId = '';
      this.form.arquivos = [];
    },
    valid() {
      if (this.form.nome !== '' && this.form.parte > 0) {
        return true;
      }
      return false;
    }
  },
  computed: {
    ...mapState('game', ['bolao'])
  }
};
</script>
