<template>
  <v-container>
    <v-card>
      <v-card-title class="grey lighten-4">
        PLAYER SETUP
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            POWER ON PLAY
            <v-spacer />
            <v-switch v-model="Setup.poweronplay" />
          </v-list-item>
          <v-list-item>
            LOOP ONE
            <v-spacer />
            <v-switch v-model="Setup.loop_one" />
          </v-list-item>
          <v-list-item>
            LOOP ALL
            <v-spacer />
            <v-switch v-model="Setup.loop" />
          </v-list-item>
          <v-list-item>
            FULL SCREEN
            <v-spacer />
            <v-switch v-model="Setup.fullscreen" />
          </v-list-item>
          <v-list-item>
            DURATION TIME
            <v-spacer />
            <v-switch v-model="Setup.progress" />
          </v-list-item>
          <v-list-item>
            CLOSE AT END OF PLAY
            <v-spacer />
            <v-switch v-model="Setup.endclose" />
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      Setup: {
        poweronplay: false,
        loop_one: false,
        loop: false,
        fullscreen: false,
        progress: false,
        endclose: false
      }
    }
  }
}
</script>
