<template>
  <v-container>
    <v-card>
      <v-card-title class="grey lighten-4">
        FILES
        <v-spacer />
        <v-btn icon @click="delFile">
          <v-icon>mdi-delete-circle-outline</v-icon>
        </v-btn>
        <v-btn icon @click="dialog = !dialog">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <FilelistTable ref="resetSelected" @updateSelected="updateSelected" />
      </v-card-text>
    </v-card>
    <FileUpload :dialog="dialog" @closeUpload="closeUpload" />
  </v-container>
</template>

<script>
import FilelistTable from '../components/FilelistTable'
import FileUpload from '../components/FileUpload'

export default {
  middleware: 'auth',
  components: {
    FilelistTable, FileUpload
  },
  data () {
    return {
      dialog: false,
      selectedFile: []
    }
  },
  methods: {
    closeUpload () {
      this.dialog = false
    },
    updateSelected (value) {
      this.selectedFile = value
    },
    async delFile () {
      const files = this.selectedFile
      if (files.lenght === 0) { return }
      const { data } = await this.$axios.post('/api/files/del', files)
      this.$store.dispatch('filelist/updateFilelist', data)
      this.$refs.resetSelected.resetSelected()
    }
  }
}
</script>
