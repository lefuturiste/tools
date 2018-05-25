<template>
<v-container>
  <v-text-field label="String" v-model="string"></v-text-field>

  <v-scale-transition>
    <v-card class="mt-4" v-if="string.length > 0 && error.enabled == false">
      <v-card-title>
        <h4>QrCode generated</h4></v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout justify-center>
          <img :src="base64" alt="The generated code" title="That is your QrCode" />
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-space-between>
          <v-btn color="info" flat v-clipboard="base64">
            Copy base64
            <v-icon right small>content_copy</v-icon>
          </v-btn>

          <v-btn color="" flat @click="download()">
            Download
            <v-icon right small>save</v-icon>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-scale-transition>
  <v-alert v-model="error.enabled" type="error" transition="scale-transition" dismissible>{{error.text}}</v-alert>
</v-container>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data() {
    return {
      string: '',
      base64: "",
      error: {
        enabled: false,
        text: ""
      }
    }
  },
  mounted() {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'qrcode_generator'
    })[0])
  },
  watch: {
    string: function(from) {
      if (from != "") {
        QRCode.toDataURL(from)
          .then(url => {
            this.base64 = url
          })
          .catch(err => {
            this.error.text = err.message
            this.error.enabled = true
          })
      }
    }
  },
  methods: {
    download: function() {
      window.open(this.base64);
    }
  }
}
</script>
