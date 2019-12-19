<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense >
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

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Lotobolao</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019 - Jeferson Menezes</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: null
  }),
  computed: {
    routerLinks() {
      return this.$router.options.routes.filter(r => r.name !== 'config');
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
