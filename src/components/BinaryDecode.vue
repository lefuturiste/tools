<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field label="From binary encoded string" v-model="from" :rules="[rules.binary]"></v-text-field>
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
      to: '',
      rules: {
        binary: (value) => {
        	var s = value.replace(/\s/g, "");
        	var data = "";
        	if (s.length % 8 != 0) {
            return "Invalid binary"
        	}else{
            return true
          }
        }
      }
    }
  },
  mounted() {

      this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
        return element.id == 'binaryGroup'
      })[0].subNav.filter(function(element) {
        return element.id == 'binaryDecode'
      })[0])
  },
  watch: {
    from: function(from) {
      var s = from;
    	s = s.replace(/\s/g, "");
    	var data = "";
    	if (s.length % 8 != 0) {
    		data = ""
    	} else {
    		while (s.length > 0) {
    			var first8 = s.substring(0, 8);

    			s = s.substring(8);

    			var chr = parseInt(first8, 2);

    			data += String.fromCharCode(chr);
    		}
    	}
    	this.to = data
    }
  }
}
</script>
