<template>
  <v-layout row wrap>
    <v-flex xs10>
      <v-file-input @change="uploadImage" label="Se tiver comprovantes anexar"></v-file-input>
    </v-flex>
    <v-flex xs2>
      <v-progress-circular v-if="load" indeterminate color="green"></v-progress-circular>
    </v-flex>
    <v-flex xs12>
      <v-container>
        <v-row>
          <v-col v-for="(item, i ) in images" :key="i" class="d-flex child-flex" cols="4">
            <v-img :src="item.url">
              <v-btn icon @click="deleteImage(item.url, i)">
                <v-icon color="red">fa-trash</v-icon>
              </v-btn>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SelectorImage',
  props: ['folder'],
  data: () => ({
    load: false,
    file: null,
    images: []
  }),
  methods: {
    ...mapActions('game', ['ActionUploadFile', 'ActionDeleteFile', 'ActionDeleteFileAll']),
    uploadImage(file) {
      if (!file) {
        return;
      }

      this.load = true;

      console.log('Target ', file);

      this.ActionUploadFile({ file: file, ref: this.folder })
        .then(res => {
          // console.log("Res", res);
          this.images.push({ url: res });
          this.getImages();
          this.load = false;
        })
        .catch(err => {
          console.log(err);
          this.load = false;
          this.$root.$emit('Notification::show', {
            tipo: 'error',
            message: 'Houve erro para adicionar imagem!'
          });
        });
    },

    deleteImage(imageUrl, index) {
      this.load = true;

      this.images.splice(index, 1);

      this.ActionDeleteFile(imageUrl)
        .then(res => {
          console.log('Res', res);
          this.getImages();
          this.load = false;
        })
        .catch(err => console.log('Err', err));
    },

    getImages() {
      this.$emit('images-selecionadas', this.images);
    }
  },
  created() {
    this.$root.$on('Images::delete', () => {
      this.ActionDeleteFileAll(this.images);
    });
  }
};
</script>
