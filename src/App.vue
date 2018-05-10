<template>
  <v-app :dark="$store.state.dark">
    <v-navigation-drawer
            fixed
            v-model="drawer"
            app
    >
      <v-list dense>
          <v-list-tile :to="{name: module.indexRoute}"
                       v-for="module in $store.state.modules" v-bind:data="module"
                       v-bind:key="module.id"
                       ripple
                       exact>
              <v-list-tile-action>
                  <v-icon>{{ module.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>{{ module.title }}</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan" fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-fade-transition mode="out-in">
            <v-toolbar-title :key="$store.state.title">
                {{ $store.state.title }}
            </v-toolbar-title>
        </v-fade-transition>
        <v-spacer></v-spacer>

        <v-btn icon @click="$store.state.settings_dialog=true">
          <v-icon>settings</v-icon>
        </v-btn>
    </v-toolbar>
    <v-content>
        <v-layout row justify-center>
          <v-flex xs12 md7 class="mt-2">
            <v-fade-transition mode="out-in">
              <router-view/>
            </v-fade-transition>
          </v-flex>
        </v-layout>
    </v-content>
    <v-footer app>
      <v-layout justify-center>
        <span>Created with <v-icon color="red" small>fas fa-heart</v-icon> by <a href="http://lefuturiste.fr">Le_Futuriste</a></span>
      </v-layout>
    </v-footer>
    <setting-dialog />
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      title: 'Vuetify.js'
    }
  },
  name: 'App',
  mounted () {
    this.$store.state.dark = this.$ls.get('dark')
  }
}
</script>
