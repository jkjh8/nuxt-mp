<template>
  <form>
    <v-alert :type="alertType" :value="errmsg" transition="scroll-y-transition">
      {{ alertMessage }}
    </v-alert>
    <v-text-field
      v-model="serverip"
      :error-messages="serveripErrors"
      label="Server IP Address"
      @input="$v.serverip.$touch()"
      @blur="$v.serverip.$touch()"
    />
    <v-text-field
      v-model="serverport"
      :error-messages="serverportErrors"
      label="Port"
      @input="$v.serverport.$touch()"
      @blur="$v.serverport.$touch()"
    />
    <v-spacer />
    <v-btn class="mr-4" @click="submit">
      SUBMIT
    </v-btn>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { ipAddress, required, maxValue } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    serverip: { ipAddress, required },
    serverport: { required, maxValue: maxValue(65535) }
  },
  data () {
    return {
      serverip: '',
      serverport: '',
      alertType: 'success',
      alertMessage: '',
      errmsg: false
    }
  },
  computed: {
    ...mapState(['playerSetup']),
    serveripErrors () {
      const errors = []
      if (!this.$v.serverip.$dirty) { return errors }
      !this.$v.serverip.ipAddress && errors.push('Must be input gate way')
      return errors
    },
    serverportErrors () {
      const errors = []
      if (!this.$v.serverport.$dirty) { return errors }
      !this.$v.serverport.maxValue && errors.push('Must be input network port')
      return errors
    }
  },
  watch: {
    errmsg (val) {
      if (!val) { return }
      setTimeout(() => (this.errmsg = false), 2000)
    }
  },
  mounted () {
    this.$axios.get('/api/setup').then((res) => {
      for (const [key, value] of Object.entries(res.data)) {
        if (key === 'rtIp') {
          this.serverip = value
        } else if (key === 'rtPort') {
          this.serverport = value
        }
      }
    })
  },
  methods: {
    submit () {
      if (this.$v.$anyError === true) {
        this.alertType = 'error'
        this.alertMessage = 'Check your ip address!'
        this.errmsg = true
      } else {
        const rtdata = {
          rtIp: this.serverip,
          rtPort: Number(this.serverport)
        }
        this.alertType = 'success'
        this.alertMessage = 'Ok! applied'
        this.errmsg = true
        this.$axios.post('/api/setup', rtdata)
      }
    }
  }
}
</script>
