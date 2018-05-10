<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field label="From string" v-model="from"></v-text-field>
      </v-flex>
      <v-flex md8>
        <v-text-field label="Base64 Encoded string" v-model="to"></v-text-field>
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
import {
  Base64
} from 'js-base64';

export default {
  data() {
    return {
      from: '',
      to: ''
    }
  },
  mounted() {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'base64decode'
    })[0])
  },
  watch: {
    from: function(from) {
      this.to = Base64.decode(from)
    }
  }
}
</script>
