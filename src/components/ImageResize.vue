<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column wrap>
      <!-- <v-text-field label="From an image url" v-model="urlInput"></v-text-field> -->
      <div class="my-2">
        <input
          type="file"
          :disabled="fileInputDisabled"
          @change="filesChange($event.target.files)"
          accept="image/*"
          class="input-file"
        />
      </div>
      <v-text-field label="From base64 image string" v-model="base64Input"></v-text-field>
      <v-layout>
        <v-flex xs12 md6>
          <v-text-field
            label="Width"
            type="number"
            v-model="width"></v-text-field>
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field 
            label="Height"
            type="number"
            v-model="height"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-btn color="info" @click="create()" :disabled="buttonDisabled">
          Create
        </v-btn>
      </v-layout>
    </v-layout>

    <img :src="urlInput" id="inputUrlImage" />

    <v-scale-transition>
      <v-card class="mt-4" v-if="generatedImage.length > 0">
        <v-card-title>
          <h4>Image generated</h4>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout justify-center>
            <img :src="generatedImage" />
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-space-between>
            <v-btn color="info" flat v-clipboard="generatedImage">
              Copy base64
              <v-icon right small>content_copy</v-icon>
            </v-btn>

            <v-btn color flat @click="download()">
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
import resizer from "image-resizer-js";
import axios from "axios";

export default {
  data() {
    return {
      desiratedWidth: 0,
      desiratedHeight: 0,
      desiratedQuality: 0,
      from: "",
      generatedImage: "",
      base64Input: "",
      urlInput: "",
      fileInputDisabled: false,
      buttonDisabled: true,
      width: 0,
      height: 0
    };
  },
  mounted() {
    this.$store.commit(
      "SET_CURRENT_MODULE",
      this.$store.state.modules.filter(function(element) {
        return element.id == "image_resize";
      })[0]
    );
  },
  watch: {
    base64Input: function (input) {
      this.buttonDisabled = input.length === 0
    }
  },
  methods: {
    base64ToArrayBuffer: function(base64) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    },
    arrayBufferToBase64: function(arrayBuffer) {
      console.log('array buffer to base64:', arrayBuffer)
      var binary = "";
      var bytes = new Uint8Array(arrayBuffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    },
    getBase64FromImageUrl: function(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    },
    filesChange: function(files) {
      let fileReader = new FileReader();

      fileReader.addEventListener("load", e => {
        this.base64Input = e.target.result;
      });
      fileReader.readAsDataURL(files[0]);
    },
    create: function() {
      const options = {
        maxWidth: this.width,
        maxHeight: this.height,
        quality: 100
      };
      const regex = /data:[a-z\/]+;base64,([A-Za-z0-9+\/]+)/gm;
      let regexResult = regex.exec(this.base64Input)
      
      let data = this.base64ToArrayBuffer(regexResult[1]);
      resizer(data, options)
        .then(image => {
          let result = 'data:image/png;base64,' + this.arrayBufferToBase64(image)
          console.log('total result:', result)
          this.generatedImage = result
        })
        .catch(err => console.error(err));
    },
    download: function() {
      let image = new Image();
      image.src = this.generatedImage;
      window.open("").document.write(image.outerHTML);
    }
  }
};
</script>
