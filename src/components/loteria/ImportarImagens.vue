<template>
  <v-layout row justify-center>
    <v-icon @click="dialog = true">mdi-paperclip</v-icon>
    <v-dialog v-model="dialog" max-width="500">
      <v-card class="elevation-1">
        <v-form @submit.prevent="submit()">
          <v-card-title
            primary-title
          >{{participante.nome || 'Não foi selecionado um participante !' }}</v-card-title>
          <v-card-title>
            <h1 class="display-1">Importar comprovante</h1>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12>
                  <selector-image folder="comprovante" @images-selecionadas="setImages" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" @click="close()">Cancelar</v-btn>
            <v-btn type="submit" color="primary">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import SelectorImage from '../global/SelectorImage';

export default {
  name: 'ImportarImagens',
  props: ['participante'],
  data: () => ({
    dialog: false,
    arquivos: []
  }),
  components: {
    SelectorImage
  },
  methods: {
    ...mapActions('enter', ['addImagens']),
    submit() {
      if (!this.participante.id) {
        this.$root.$emit('Notification::show', {
          tipo: 'error',
          message: 'Não existe nenhum participante selecionado!'
        });
        return;
      }

      this.addImagens({ arquivos: this.arquivos, id: this.participante.id })
        .then(res => {
          this.$root.$emit('Notification::show', {
            tipo: 'success',
            message: 'Imagens salva com sucesso!'
          });

          this.$router.push({ name: 'home' });
        })
        .catch(err => {
          console.log(err);
          this.$root.$emit('Notification::show', {
            tipo: 'error',
            message: 'Houve um erro ao salvar imagens!'
          });
        });
    },
    setImages(payload) {
      this.arquivos = payload;
    },
    close() {
      if (this.arquivos.length) {
        this.$root.$emit('Images::delete');
      }
      this.dialog = false;
    }
  }
};
</script>
