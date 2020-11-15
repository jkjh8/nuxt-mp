<template>
  <v-container>
    <v-card>
      <v-card-title class="grey lighten-4">
        FILES
        <v-spacer />
        <v-btn>
          UPLOAD
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          v-model="selected"
          :headers="fileListHeaders"
          :items="filelist"
          item-key="name"
          show-select
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async asyncData (context) {
    const { data } = await context.$axios.get('/api/files/filelist')
    return {
      filelist: data
    }
  },
  data () {
    return {
      selected: [],
      fileListHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Length', value: 'duration' },
        { text: 'Size', value: 'size' },
        { text: 'Auctions', value: 'auctions' }
      ]
    }
  }
}
</script>
