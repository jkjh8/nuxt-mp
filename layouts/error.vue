<template>
  <v-container class="pt-12 mt-12">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <v-btn
      to="/"
      color="blue-grey darken-4"
      dark
    >
      Home page
    </v-btn>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
v-container {
  display: table;
  margin: auto;
  text-align: center;
}
h1 {
  font-size: 5em;
}
</style>
