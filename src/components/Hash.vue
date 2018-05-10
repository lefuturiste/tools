<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex md9 xs8>
        <v-text-field label="From string" v-model="from"></v-text-field>
      </v-flex>
      <v-flex md3 xs4>
        <v-select :items="alghorithms_available" v-model="alghorithm_used" label="Alghorithm" single-line></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md8>
        <v-text-field label="Hashed string" v-model="to" :hint="to.length + ' characthers longs'" persistent-hint></v-text-field>
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
var shajs = require('sha.js')
var apacheCrypt = require("apache-crypt");
var md5 = require('md5');
var CryptMD5 = require('cryptmd5');
export default {
  data() {
    return {
      from: '',
      to: '',
      alghorithms_available: [{
          text: 'SHA-256',
          value: "sha256"
        },
        {
          text: 'SHA-512',
          value: "sha512"
        },
        {
          text: 'SHA-1',
          value: "sha1"
        },
        {
          text: 'MD5',
          value: "md5"
        },
        {
          text: 'Apache Crypt',
          value: "apache-crypt"
        },
        {
          text: 'MD5 Crypt',
          value: "md5-crypt"
        }
      ],
      alghorithm_used: "sha256"
    }
  },
  mounted() {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'hash'
    })[0])
  },
  methods: {
    updated: function(from) {
      switch (this.alghorithm_used) {
        case "sha1":
          this.to = shajs('sha1').update(from).digest('hex')
          break;

        case "sha256":
          this.to = shajs('sha256').update(from).digest('hex')
          break;

        case "sha512":
          this.to = shajs('sha512').update(from).digest('hex')
          break;

        case "md5":
          this.to = md5(from)
          break;

        case "apache-crypt":
          this.to = apacheCrypt(from)
          break;

        case "md5-crypt":
          this.to = CryptMD5.cryptMD5(from)
          break;
      }
    }
  },
  watch: {
    alghorithm_used: function(val) {
      this.updated(this.from)
    },
    from: function(from) {
      this.updated(from)
    }
  }
}
</script>
