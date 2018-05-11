<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field label="From string" v-model="from"></v-text-field>
      </v-flex>
      <v-flex md8>
        <v-text-field label="Binary Encoded string" v-model="to"></v-text-field>
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
      return element.id == 'binaryGroup'
    })[0].subNav.filter(function(element) {
      return element.id == 'binaryEncode'
    })[0])
  },
  watch: {
    from: function(from) {
      var data = from
      //array holds the initial set of un-padded binary results
      var binArray = [];

      //the string to hold the padded results
      var datEncode = "";

      //encode each character in data to it's binary equiv and push it into an array
      var i;
      for (i=0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2));
      }

      //loop through binArray to pad each binary entry.
      var j;
      for (j=0; j < binArray.length; j++) {
        //pad the binary result with zeros to the left to ensure proper 8 bit binary
        var pad = this.padding_left(binArray[j], '0', 8);

        //append each result into a string
        datEncode += pad + ' ';
      }

      this.to = datEncode
    }
  },
  methods: {
    padding_left: function (s, c, n) {
    	if (!s || !c || s.length >= n) {
    		return s;
    	}

    	var max = (n - s.length) / c.length;
    	for ( var i = 0; i < max; i++) {
    		s = c + s;
    	}

	     return s;
    }
  }
}
</script>
