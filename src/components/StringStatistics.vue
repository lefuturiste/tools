<template>
  <v-container>
    <v-text-field label="String" v-model="string"></v-text-field>

    <v-scale-transition>
      <v-card class="mt-4" v-if="string.length > 0">
        <v-card-title>
          <h4>Details about this string</h4></v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>Length</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ string.length }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-scale-transition>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      string: ''
    }
  },
  mounted() {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'string_statistics'
    })[0])
  },
  watch: {
    from: function(from) {
      this.to = Base64.encode(from)
    }
  }
}
</script>
