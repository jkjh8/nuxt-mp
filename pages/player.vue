<template>
  <v-container>
    <v-card>
      <v-card-title class="grey lighten-4">
        PLAYER SETUP
      </v-card-title>
      <v-card-text>
        <v-list>
          <template v-for="(item, index) in Setup">
            <v-list-item :key="index">
              {{ item.name }}
              <v-spacer />
              <v-switch
                v-model="item.value"
                @click="playerSet()"
              />
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      Setup: [
        { name: 'POWER ON PLAY', index: 'poweronplay', value: false },
        { name: 'LOOP ONE', index: 'loop_one', value: false },
        { name: 'LOOP', index: 'loop', value: false },
        { name: 'FULL SCREEN', index: 'fullscreen', value: true },
        { name: 'DURATION', index: 'progress', value: false },
        { name: 'END STOP & CLOSE', index: 'endclose', value: false }
      ]
    }
  },
  mounted () {
    this.$axios.get('/api/setup').then((res) => {
      for (const [key, value] of Object.entries(res.data)) {
        this.Setup.forEach((item, index) => {
          if (item.index === key) {
            this.Setup[index].value = value
          }
        })
      }
    })
  },
  methods: {
    playerSet () {
      const rtObject = {}
      this.Setup.forEach((item) => {
        rtObject[item.index] = item.value
      })
      this.$axios.post('/api/setup', rtObject)
    }
  }
}
</script>
