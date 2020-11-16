<template>
  <form>
    <v-card
      class="mx-auto my-12"
      max-width="400px"
    >
      <v-card-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-alert :type="alertType" :value="errmsg" transition="scroll-y-transition">
          {{ message }}
        </v-alert>
        <v-text-field
          v-model="id"
          label="ID"
          :error-messages="idErrors"
          @input="$v.id.$touch()"
          @blur="$v.id.$touch()"
        />
        <v-text-field
          v-model="password"
          label="Password"
          :error-messages="pwErrors"
          :value="isPwd"
          :append-icon="isPwd ? 'mdi-eye-off' : 'mdi-eye'"
          :type="isPwd ? 'password' : 'text'"
          @click:append="isPwd = !isPwd"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
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
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { minLength, required } from 'vuelidate/lib/validators'

export default {
  middleware: 'auth',
  auth: 'guest',
  mixins: [validationMixin],
  validations: {
    id: { required, minLength: minLength(4) },
    password: { required, minLength: minLength(8) }
  },
  data () {
    return {
      id: null,
      password: null,
      message: null,
      isPwd: true,
      errmsg: false,
      alertType: 'success'
    }
  },
  computed: {
    idErrors () {
      const errors = []
      if (!this.$v.id.$dirty) { return errors }
      !this.$v.id.minLength && errors.push('Id must be at least 4 characters long')
      !this.$v.id.required && errors.push('Id is required.')
      return errors
    },
    pwErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    }
  },
  watch: {
    errmsg (val) {
      if (!val) { return }
      setTimeout(() => (this.errmsg = false), 2000)
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
          this.errmsg = true
          this.alertType = 'error'
          this.message = err.response.data.message
        }
      })
    }
  }
}
</script>
