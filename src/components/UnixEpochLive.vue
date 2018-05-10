<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-text-field label="Now timestamp" v-model="now" disabled></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-text-field label="Unix Epoch" v-model="unix_epoch"></v-text-field>
      </v-flex>
      <v-flex xs12 md2>
        <v-btn color="info" v-clipboard="unix_epoch">
          Copy result
          <v-icon right small>content_copy</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
var moment = require('moment');
export default {
  data() {
    return {
      unix_epoch: 0,
      now: ""
    }
  },
  mounted() {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'unix_epoch_live'
    })[0])
    this.newLoop()
  },
  methods: {
    newLoop: function () {
      setTimeout(() =>  {
        this.now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
        this.unix_epoch = moment().format("X")
        this.newLoop()
      }, 1000);
    }
  }
}
</script>
