<template>
  <v-container>
    <v-card>
      <v-card-title
        class="grey lighten-4"
      >
        <v-row dense>
          <v-col cols="8">
            <h4>PLAY LIST</h4>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="selected"
              :items="items"
              item-text="label"
              item-value="id"
              outlined
              hide-details
              dense
              @change="changePlaylist(`${selected}`)"
            />
          </v-col>
          <v-col cols="1">
            <v-btn
              class="mx-6"
              icon
              @click="addFileDialog = !addFileDialog"
            >
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  Index
                </th>
                <th>
                  Name
                </th>
                <th>
                  Length
                </th>
                <th class="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tr v-for="(item, i) in playlist" :key="i">
              <td class="text-center">
                {{ item.playid + 1 }}
              </td>
              <td>{{ item.name }}</td>
              <td>{{ times(item.duration) }}</td>
              <td class="text-center">
                <v-btn
                  icon
                  @click="changeList(i, i - 1)"
                >
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="changeList(i, i + 1)"
                >
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-play</v-icon>
                </v-btn>
                <v-btn
                  color="red darken-4"
                  icon
                  @click="deleteList(i)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="addFileDialog">
      <v-card>
        <v-card-title>
          <h4>Add Files</h4>
        </v-card-title>
        <v-card-text>
          <FilelistTable ref="resetSelected" @updateSelected="updateSelected" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            icon
            @click="addFiles"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="addFileDialog = false"
          >
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { formatTimes } from '../plugins/format'
import FilelistTable from '../components/FilelistTable'

export default {
  middleware: 'auth',
  components: {
    FilelistTable
  },
  data () {
    return {
      items: [
        { label: 'Playlist 1', id: 0 },
        { label: 'Playlist 2', id: 1 },
        { label: 'Playlist 3', id: 2 },
        { label: 'Playlist 4', id: 3 },
        { label: 'Playlist 5', id: 4 },
        { label: 'Playlist 6', id: 5 },
        { label: 'Playlist 7', id: 6 },
        { label: 'Playlist 8', id: 7 }
      ],
      playlist: [],
      selected: null,
      addFileDialog: false,
      selectedList: []
    }
  },
  computed: {
    ...mapState({
      playlistId: state => state.playlist.playlistId
    })
  },
  async created () {
    const { data } = await this.$axios.get(`/api/playlist/${this.playlistId}`)
    this.playlist = data
    this.selected = this.playlistId
  },
  methods: {
    times (time) {
      return formatTimes(time * 1000)
    },
    async changePlaylist (id) {
      await this.$store.dispatch('playlist/updatePlaylistId', id)
      const { data } = await this.$axios.get(`/api/playlist/${this.playlistId}`)
      this.playlist = data
    },
    async changeList (fromIndex, toIndex) {
      const squPlaylist = []
      this.playlist.forEach((file) => {
        squPlaylist.push(file)
      })
      const minIndex = 0
      const maxIndex = squPlaylist.length - 1

      if (maxIndex < toIndex) { toIndex = minIndex }
      if (toIndex < minIndex) { toIndex = maxIndex }

      await squPlaylist.splice(toIndex, 0, squPlaylist.splice(fromIndex, 1)[0])
      this.playlist = []
      await squPlaylist.forEach((file, index) => {
        file.playid = index
        this.playlist.push(file)
      })
      this.$axios.post('/api/playlist', { id: this.playlistId, list: this.playlist })
    },
    async deleteList (index) {
      this.playlist.splice(index, 1)
      await this.playlist.forEach((file, id) => {
        this.playlist[id].playid = id
      })
      this.$axios.post('/api/playlist', { id: this.playlistId, list: this.playlist })
    },
    updateSelected (value) {
      this.selectedList = value
    },
    async addFiles () {
      this.addFileDialog = false
      const playlistLength = this.playlist.length
      await this.selectedList.forEach((file, idx) => {
        file.playid = playlistLength + idx
        this.playlist.push(file)
      })
      this.$axios.post('/api/playlist', { id: this.playlistId, list: this.playlist })
    }
  }
}
</script>
