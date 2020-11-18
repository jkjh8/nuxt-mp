<template>
  <v-container>
    <v-card class="mx-auto" max-width="400" align="right">
      <v-card-title class="grey lighten-4">
        <h4>IP ADDRESS SETUP</h4>
        <v-spacer />
        <v-switch v-model="dhcp" label="DHCP" hide-details @change="dhcpChange($event)" />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <InputIpAddr :dhcp="dhcp" />
        <InputServerAddr />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import InputIpAddr from '../components/InputIpAddr'
import InputServerAddr from '../components/InputServerAddr'

export default {
  middleware: 'auth',
  components: {
    InputIpAddr, InputServerAddr
  },
  data () {
    return {
      dhcp: false
    }
  }
}
</script>
