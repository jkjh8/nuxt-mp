<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-width="400px"
    >
      <v-card-title>
        My Account
      </v-card-title>
      <v-card-text>
        <div>
          <h2>{{ this.$auth.user.name }}</h2>
        </div>
        <div>
          <strong>{{ this.$auth.user.email }}</strong>
        </div>
        <div>
          <nuxt-link
            to="/user/logout"
            class="btn btn-danger"
          >
            LOGOUT
          </nuxt-link>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
