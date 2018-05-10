<template>
  <div>
    <div v-for="module in $store.state.modules"
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
        <v-divider></v-divider>
    </div>
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
