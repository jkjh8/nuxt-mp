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
              :value="playlistId"
              :items="items"
              item-text="label"
              item-value="id"
              outlined
              hide-details
              dense
            />
          </v-col>
          <v-col cols="1">
            <v-btn class="mx-6" icon>
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
                <th class="text-center">Index</th>
                <th>Name</th>
                <th>Length</th>
                <th class="text-center" style="width:145px">Actions</th>
              </tr>
            </thead>
            <tr v-for="(item, i) in playList" :key="i">
              <td>
                <v-avatar :color="item.color" size="30px" style="font-weight:bold; color:#383230" >{{ i + 1 }}</v-avatar>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ formatTimes(item.duration) }}</td>
              <td>
                <v-btn color="green darken-4" icon @click="Player({ command: 'playid,'+ i })"><v-icon>mdi-play</v-icon></v-btn>
                <v-btn  color="red darken-4" icon @click="delPlayListItem(i)"><v-icon>mdi-delete</v-icon></v-btn>
              </td>
            </tr>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    ...mapState({
      playlistId: state => state.playlist.playlistId
    })
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
      ]
    }
  }
}
</script>
