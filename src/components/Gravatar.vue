<template>
  <v-container>
    <v-text-field label="Email" v-model="email" :rules="[rules.email]"></v-text-field>
    <v-scale-transition>
      <v-card class="mt-4" v-if="url.length > 0">
        <v-card-title>
          <h4>Email's avatar</h4></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout justify-center>
            <img :src="url" alt="The email's avatar" />
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-space-between>
            <v-btn color="" flat @click="download()">
              Download
              <v-icon right small>save</v-icon>
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-scale-transition>
  </v-container>
</template>

<script>
const Gravatar = require('gravatar')
import * as EmailValidator from 'email-validator';

export default {
  data() {
    return {
      url: '',
      email: '',
      rules: {
        email: function(email) {
          if(EmailValidator.validate(email)){
            return true
          }else{
            return "You must provide a valid email"
          }
        }
      }
    }
  },
  mounted() {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'gravatar'
    })[0])
  },
  watch: {
    email: function(email) {
      if(EmailValidator.validate(email)){
        this.url = Gravatar.url(email)
      }
    }
  },
  methods: {
    download: function() {
      window.open(this.url);
    }
  }
}
</script>
