<template>
  <div>
    <!--<div v-for="module in $store.state.modules"
         v-bind:data="module"
         v-bind:key="module.title">
        <v-list-tile avatar @click="$router.push({name: module.indexRoute})">
            <v-list-tile-avatar>
                <v-icon>{{ module.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>{{ module.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ module.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </div> -->
      <v-list dense>
    <template v-for="module in $store.state.modules">
      <v-list-group
        :key="module.id + '_main'"
        v-if="module.subNav != false"
        v-model="module.actived"
      >
        <v-list-tile avatar slot="activator">
          <v-list-tile-avatar>
             <v-icon>{{ module.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
              <v-list-tile-title>{{ module.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ module.description }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="subItem in module.subNav" v-bind:data="subItem"
              v-bind:key="subItem.id"
              :to="{name: subItem.indexRoute}"
                     ripple>
         <v-list-tile-action>
            <v-icon></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ subItem.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-tile :to="{name: module.indexRoute}"
                   :key="module.id + '_sub'"
                   ripple
                   exact
                   avatar
                   v-if="module.subNav == false">
          <v-list-tile-avatar>
              <v-icon>{{ module.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
              <v-list-tile-title>{{ module.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ module.description }}</v-list-tile-sub-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-divider :key="module.id + '_divider'" />
    </template>
  </v-list>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'index'
    })[0])
  }
}
</script>
