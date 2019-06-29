<template>
  <v-container grid-list-md text-xs-center>
    <v-alert
      v-model="invalidSignature"
      type="error"
      transition="scale-transition"
      dismissible
    >Invalid signature</v-alert>
    <v-alert
      v-model="validSignature"
      type="success"
      transition="scale-transition"
      dismissible
    >Valid signature</v-alert>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field prepend-icon="code" label="Json Web Token" v-model="from"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field prepend-icon="vpn_key" label="Your secret key" v-model="secret"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="showHeaderPayload">
      <v-flex xs12>
        <p>Header</p>
        <json-viewer 
          copyable
          boxed
          :value="header"></json-viewer>
      </v-flex>    
      <v-flex xs12>
        <p>Payload</p>
        <json-viewer
          copyable
          boxed
          :value="payload"></json-viewer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import JsonWebToken from "jsonwebtoken";
import JsonViewer from 'vue-json-viewer';
export default {
  data() {
    return {
      from: "",
      secret: "",
      header: {},
      payload: {},
      fullToken: false,
      invalidSignature: false,
      validSignature: false,
      showHeaderPayload: false
    };
  },
  components: {
    JsonViewer
  },
  mounted() {
    this.$store.commit(
      "SET_CURRENT_MODULE",
      this.$store.state.modules.filter(function(element) {
        return element.id == "jwt_decode";
      })[0]
    );
  },
  methods: {
    parse: function() {
      if (this.from.length !== 0) {
        let components = this.from.split(".");
        if (components.length >= 2) {
          if (components.length === 3) {
            components.pop();
            this.fullToken = true;
          }
          components = components.map(component => {
            console.log(component);
            return JSON.parse(atob(component));
          });
          this.payload = components[0];
          this.header = components[1];
          if (Object.keys(this.payload).length != 0 || Object.keys(this.payload).length != 0) {
            this.showHeaderPayload = true
          }
        }
      }
    },
    verify: function() {
      this.validSignature = false
      try {
        let result = JsonWebToken.verify(this.from, this.secret);
        this.validSignature = true
        this.invalidSignature = false
      } catch (err) {
        this.invalidSignature = err.message.indexOf('invalid signature') !== -1
      } 

    }
  },
  watch: {
    from: function() {
      this.parse();
      if (this.secret != "") {
        this.verify();
      }
    },
    secret: function() {
      this.verify();
    }
  }
};
</script>
