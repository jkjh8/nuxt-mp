<template>
  <v-container>
    <v-card
      class="mx-auto my-12"
      max-width="400px"
    >
      <v-card-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="id"
          label="ID"
        />
        <v-text-field
          v-model="password"
          label="Password"
          :value="isPwd"
          :append-icon="isPwd ? 'mdi-eye-off' : 'mdi-eye'"
          :type="isPwd ? 'password' : 'text'"
          @click:append="isPwd = !isPwd"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="submitForm"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      id: null,
      password: null,
      message: null,
      isPwd: true
    }
  },
  methods: {
    submitForm () {
      this.$auth.loginWith('local', {
        data: {
          id: this.id,
          password: this.password
        }
      }).catch((err) => {
        if (err.response.data.message) {
          this.message = err.response.data.message
        }
      })
    }
  }
}
</script>
