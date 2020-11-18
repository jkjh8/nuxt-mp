<template>
  <form>
    <v-alert :type="alertType" :value="errmsg" transition="scroll-y-transition">
      {{ alertMessage }}
    </v-alert>
    <v-text-field
      v-model="ip"
      :error-messages="ipErrors"
      label="IP Address"
      :disabled="dhcp"
      @input="$v.ip.$touch()"
      @blur="$v.ip.$touch()"
    />
    <v-text-field
      v-model="nm"
      :error-messages="nmErrors"
      label="Net Mask"
      :disabled="dhcp"
      @input="$v.nm.$touch()"
      @blur="$v.nm.$touch()"
    />
    <v-text-field
      v-model="gw"
      :error-messages="gwErrors"
      label="Gate Way"
      :disabled="dhcp"
      @input="$v.gw.$touch()"
      @blur="$v.gw.$touch()"
    />
    <v-spacer />
    <v-btn class="mr-4" :disabled="dhcp" @click="submit">
      SUBMIT
    </v-btn>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { ipAddress, required } from 'vuelidate/lib/validators'

export default {
  middleware: 'auth',
  mixins: [validationMixin],
  validations: {
    ip: { ipAddress, required },
    nm: { ipAddress },
    gw: { ipAddress }
  },
  props: {
    dhcp: { type: Boolean }
  },
  data () {
    return {
      ip: '',
      nm: '',
      gw: '',
      alertType: 'success',
      alertMessage: '',
      errmsg: false
    }
  },
  computed: {
    ...mapState(['playerSetup']),
    ipErrors () {
      const errors = []
      if (!this.$v.ip.$dirty) { return errors }
      !this.$v.ip.ipAddress && errors.push('Must be input ip address')
      !this.$v.ip.required && errors.push('Name is required.')
      return errors
    },
    nmErrors () {
      const errors = []
      if (!this.$v.nm.$dirty) { return errors }
      !this.$v.nm.ipAddress && errors.push('Must be input ip address')
      return errors
    },
    gwErrors () {
      const errors = []
      if (!this.$v.gw.$dirty) { return errors }
      !this.$v.gw.ipAddress && errors.push('Must be input gate way')
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
        if (key === 'ip') {
          this.ip = value
        } else if (key === 'netmask') {
          this.nm = value
        } else if (key === 'gw') {
          this.gw = value
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
          ip: this.ip,
          netmask: this.nm,
          gw: this.gw
        }
        this.alertType = 'success'
        this.alertMessage = 'Apply after reboot'
        this.errmsg = true
        this.$axios.post('/api/setup', rtdata)
      }
    }
  }
}
</script>
