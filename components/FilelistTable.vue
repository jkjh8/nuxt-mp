<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="filelist"
      item-key="name"
      show-select
    >
      <template v-slot:item.duration="{ item }">
        {{ times(item.duration) }}
      </template>
      <template v-slot:item.size="{ item }">
        {{ bytes(item.size) }}
      </template>
      <template v-slot:item.preview="{ item }">
        <v-btn
          icon
          @click="Preview(item.name)"
        >
          <v-icon>mdi-play-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="videoDialog" internal-activator max-width="700px" :aspect-ratio="16/9">
      <VideoPreview :video-source="videoSource" />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { dataFormat } from '../mixins/format'
import VideoPreview from '../components/VideoPreview'

export default {
  components: {
    VideoPreview
  },
  mixins: [dataFormat],
  data () {
    return {
      selected: [],
      videoSource: 'width: 600',
      videoDialog: false,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Length', value: 'duration' },
        { text: 'Size', value: 'size' },
        { text: 'Preview', value: 'preview' }
      ]
    }
  },
  computed: {
    ...mapState({
      filelist: state => state.filelist.filelist
    })
  },
  watch: {
    selected (value) {
      this.$emit('updateSelected', value)
    }
  },
  async created () {
    const { data } = await this.$axios.get('/api/files/filelist')
    this.$store.dispatch('filelist/updateFilelist', data)
  },
  methods: {
    resetSelected () {
      this.selected = []
    },
    Preview (file) {
      // this.$$refs.mediaPlayer.pause()
      // this.videoSource = file.item.name + '.' + file.item.type
      this.videoDialog = true
      this.videoSource = {
        width: 700,
        autoplay: true,
        sources: [{
          type: 'video/mp4',
          // src: 'http://' + window.location.hostname + ':12345/media/' + file.item.name + '.' + file.item.type
          src: 'http://' + window.location.hostname + ':3000/api/files/preview/' + file
        }]
      }
    }
  }
}
</script>
