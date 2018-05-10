<template>
  <div>
    <v-text-field
     v-model="json"
     label="JSON"
     multi-line
   />
   <v-btn @click="generate()" color="primary">Generate</v-btn>
    <div id="jsoneditor" style="width: 100%; height:100%;" class="mt-4"></div>
 </div>
</template>

<script>
import JSONEditor from "jsoneditor"
import "jsoneditor/dist/jsoneditor.min.css"
export default {
  data () {
    return {
        json: "",
        editor: ""
    }
  },
  mounted () {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'json_viewer'
    })[0])

    // create the editor
    var container = document.getElementById("jsoneditor");
    var options = {};
    this.editor = new JSONEditor(container, options);
  },
  methods: {
    generate: function () {
      this.editor.set(JSON.parse(this.json));
    }
  }
}
</script>
