<template>
  <v-app id="inspire">
    <sweet-alert></sweet-alert>
    <v-navigation-drawer v-model="drawer" app clipped v-if="hasBolaoId()">
      <v-list dense>
        <v-list-item v-for="(item, index) in routerLinks" :key="index" :to="item.path" link>
          <v-list-item-action>
            <v-icon>{{item.meta.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.meta.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <span class="hidden-sm-and-down title text-uppercase">
          Loto
          <span class="font-weight-light">bolao</span>
        </span>
      </v-toolbar-title>
      <v-spacer />
      <update-bolao></update-bolao>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app >
      <span class="text-center font-weight-thin ma-0 pa-0">
        &copy; 2019 - Jeferson Menezes
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import SweetAlert from './components/global/SweetAlert';
import UpdateBolao from './components/loteria/UpdateBolao';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    SweetAlert,
    UpdateBolao
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    ...mapGetters('game', ['hasBolaoId'])
  },
  computed: {
    routerLinks() {
      return this.$router.options.routes.filter(
        r => r.name !== 'hint' && r.name !== 'game'
      );
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
