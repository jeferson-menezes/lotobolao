<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="100" offset-x>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon>mdi-help-circle</v-icon>
        </v-btn>
      </template>

      <v-card  width="350">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQFQMOzGGRYuXQ/profile-displayphoto-shrink_100_100/0?e=1582761600&v=beta&t=zPTNdj3kGD12iiDNBKLJCHovusyH-Obd4VbabTMIe3U"
                  alt="Jeferson"
                />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Jeferson Menezes</v-list-item-title>
              <v-list-item-subtitle>criador do projeto loto bolão</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn :class="fav ? 'red--text' : 'orange--text'" icon @click="fav = !fav">
                <v-icon>mdi-fire</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Gostou da idéia do projeto</v-list-item-title>
              <v-list-item-subtitle>se quiser contribuir projeto no github</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-btn
                small
                text
                href="https://github.com/jeferson-menezes/lotobolao"
                target="_blank"
              >
                <v-icon>mdi-github-circle</v-icon>
              </v-btn>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    fav: true,
    menu: false
  })
};
</script>
