<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field label="From Hex Encoded" v-model="from"></v-text-field>
      </v-flex>
      <v-flex md8>
        <v-text-field label="Decoded string" v-model="to"></v-text-field>
      </v-flex>
      <v-flex md4>
        <v-btn color="info"  v-clipboard="to">
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
        return element.id == 'hexGroup'
      })[0].subNav.filter(function(element) {
        return element.id == 'hexDecode'
      })[0])
  },
  watch: {
    from: function(from) {
      var hex = from
      var str = '';
      for(var i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      this.to = str;
    }
  }
}
</script>
