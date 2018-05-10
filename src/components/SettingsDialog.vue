<template>
  <div>
    <v-dialog v-model="$store.state.settings_dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <v-icon small class="mr-2">settings</v-icon> Settings
          </v-card-title>
          <v-card-text>
            <p> All of these settings are saved in the client's local storage</p>
            <form>
              <v-switch
                    label="Enable dark mode"
                    v-model="dark"
                    color="indigo"
                  ></v-switch>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="$store.state.settings_dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  name: "SettingsDialog",
  data() {
    return {
      dark: false
    }
  },
  mounted() {
      this.dark = this.$ls.get('dark')
  },
  watch: {
    dark: function (val) {
      this.$ls.set('dark', val)
      this.$store.commit('SET_DARK', val)
    }
  },
  methods: {
  }
}
</script>
