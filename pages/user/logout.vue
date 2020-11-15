<template>
  <v-container>
    <h1>Logging out</h1>
    <hr>
    <p>Please wait...</p>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData (context) {
    await context.$auth.logout()
  }
}
</script>
