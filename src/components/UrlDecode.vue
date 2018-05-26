<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field label="From URL Encoded" v-model="from"></v-text-field>
      </v-flex>
      <v-flex md8>
        <v-text-field label="Decoded string" v-model="to"></v-text-field>
      </v-flex>
      <v-flex md4>
        <v-btn color="info" v-clipboard="to">
          Copy result
          <v-icon right small>content_copy</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      from: '',
      to: ''
    }
  },
  mounted() {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'urlGroup'
    })[0].subNav.filter(function(element) {
      return element.id == 'urlDecode'
    })[0])
  },
  watch: {
    from: function(from) {
      this.to = decodeURIComponent(from)
    }
  }
}
</script>
