<template>
<v-container>
  <v-text-field label="Webhook url" v-model="webhook_url" hint="The complete webhook url with token"></v-text-field>
  <v-btn right @click="search()" color="primary">Show details</v-btn>

  <v-alert v-model="error" type="error" transition="scale-transition" dismissible>Error with the HTTP request</v-alert>

  <v-scale-transition>
    <div v-if="details_show">
    <v-card class="mt-4">
      <v-card-title>
        <h4>Details about this webhook</h4></v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Name</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ details.name }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Channel id</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ details.channel_id }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Token</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ details.token }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="details.avatar != null">
          <v-list-tile-content>Avatar</v-list-tile-content>
          <v-list-tile-content class="align-end">
            <v-avatar size="40" color="grey lighten-4">
              <img :src="'https://cdn.discordapp.com/avatars/' + details.id + '/' + details.avatar + '.png?size=128'" alt="avatar">
            </v-avatar>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Guild id</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ details.guild_id }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Id</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ details.id }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

    <v-card class="mt-4" v-if="details_show">
        <v-card-title>
          <div style="width: 100%">

              <h4>Send a message</h4><br>

              <v-text-field
                v-model="message"
                label="Your message"
                />
         </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn :loading="message_loading" color="primary" @click="sendMessage()" flat>Send</v-btn>
        </v-card-actions>
    </v-card>
  </div>
  </v-scale-transition>

  <v-snackbar
    v-model="message_snackbar.enabled"
    :color="message_snackbar.color"
    right bottom>
    {{ message_snackbar.text }}
    <v-btn
      flat color="white" @click.native="message_snackbar.enabled = false">Close</v-btn>
  </v-snackbar>
</v-container>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      webhook_url: "",
      error: false,
      details_show: false,
      details: {
        name: "",
        channel_id: "",
        token: "",
        avatar: "",
        guild_id: "",
        id: ""
      },
      message: "",
      message_loading: false,
      message_snackbar: {
        enabled: false,
        color: "",
        text: ""
      }
    }
  },
  mounted() {
    this.$store.commit('SET_CURRENT_MODULE', this.$store.state.modules.filter(function(element) {
      return element.id == 'discord_webhook'
    })[0])
  },
  methods: {
    search: function() {
      this.details_show = false
      this.error = false
      axios.get(this.webhook_url).then((response) => {

        this.details = response.data
        this.details_show = true
      }).catch((error) => {
        this.error = true
      })
    },
    sendMessage: function () {
      this.message_loading = true
      axios.post(this.webhook_url, {
        content: this.message
      }).then((response) => {
        this.message_loading = false
        this.message_snackbar = {
          enabled: true,
          color: "success",
          text: "The message has been sent!"
        }
      }).catch((error) => {
        this.message_loading = false
        this.message_snackbar = {
          enabled: true,
          color: "error",
          text: "Error white sending message!"
        }
      })
    }
  }
}
</script>
