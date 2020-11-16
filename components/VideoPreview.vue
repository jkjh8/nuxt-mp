<template>
  <video-player
    ref="videoPlayer"
    v-click-outside="pause"
    class="video-player-box"
    align="middle"
    :options="videoSource"
    :playsinline="true"

    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
  />
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  props: {
    videoSource: { type: Object, default: null }
  },
  data () {
    return {
      isPlaying: false
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    pause () {
      if (this.isPlaying === true) {
        this.player.pause()
      }
    },
    onPlayerPlay (player) {
      this.isPlaying = true
    },
    onPlayerPause (player) {
      this.isPlaying = false
    }
  }
}
</script>
