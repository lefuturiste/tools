<template>
<v-container>
  <v-card>
    <v-card-title>
      <div style="width:100%">
        <h4>Settings</h4>
        <br>
        <v-checkbox label="Numeric digits (0-9)" v-model="settings.digits"></v-checkbox>
        <v-checkbox label="Uppercase letters (A-Z)" v-model="settings.uppercase"></v-checkbox>
        <v-checkbox label="Lowercase letters (a-z)" v-model="settings.lowercase"></v-checkbox>
        <v-checkbox label="Special characters" v-model="settings.specials"></v-checkbox>
        <v-text-field label="Length" v-model="settings.length" :rules="[rules.number]"></v-text-field>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-layout justify-end>
        <v-btn color="primary" @click="generate()">Generate</v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
  <v-scale-transition>
    <div v-if="show" class="mt-4">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex md8>
            <v-text-field v-model="generated" label="Result string"></v-text-field>
          </v-flex>
          <v-flex md4>
            <v-btn color="info"  v-clipboard="generated">
              Copy result
              <v-icon right small>content_copy</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-scale-transition>
</v-container>
</template>

<script>
var randomize = require('randomatic');
export default {
  data() {
    return {
      show: false,
      generated: "",
      settings: {
        digits: true,
        uppercase: true,
        lowercase: true,
        specials: false,
        length: 20
      },
      rules: {
        number: function(val) {
          if (!isNaN(parseFloat(val)) && isFinite(val)) {
            return true
          }else{
            return "You must provide a digit"
          }
        }
      }
    }
  },
  mounted() {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'random_generator'
    })[0])
  },
  methods: {
    generate: function() {
      var pattern = ""
      if (this.settings.digits) {
        pattern += "0"
      }
      if (this.settings.uppercase) {
        pattern += "A"
      }
      if (this.settings.lowercase) {
        pattern += "a"
      }
      if (this.settings.specials) {
        pattern += "!"
      }
      if (pattern == "") {
        pattern = "*"
      }
      this.generated = randomize(pattern, this.settings.length);
      this.show = true
    }
  }
}
</script>
