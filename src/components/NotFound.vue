<template>
  <v-container fill-height fluid>
    <v-layout justify-center align-item-center>
    Lulz, not found page
    </v-layout>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('SET_TITLE', "Page not found")
  }
}
</script>
