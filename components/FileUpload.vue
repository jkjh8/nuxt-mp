<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="600px" height="300px">
      <v-card>
        <v-card-title class="grey lighten-4">
          <h3>FILE UPLOAD</h3>
        </v-card-title>
        <v-card-text>
          <v-file-input v-model="selectedFiles" placeholder="Upload your files" label="Select Files" multiple prepend-icon="mdi-paperclip">
            <template v-slot:selection="{ text }">
              <v-chip small label color="primary">
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
        </v-card-text>
        <v-card-actions class="grey lighten-4">
          <v-spacer />
          <v-btn icon @click="uploadFiles">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn icon class="pa-3" @click="close">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="uploadDialog" max-width="600px" persistent>
      <ProgressPopup :upload-file-index="uploadFileIndex" :upload-file-name="uploadFileName" :progress-value="progressValue" />
    </v-dialog>
  </v-container>
</template>

<script>
import UploadService from '../plugins/UploadFilesService'
import ProgressPopup from './progressDialog'

export default {
  components: { ProgressPopup },
  props: {
    dialog: Boolean
  },
  data () {
    return {
      selectedFiles: [],
      uploadFileIndex: '',
      uploadFileName: '',
      progressValue: 0,
      uploadDialog: false
    }
  },
  methods: {
    close () { this.$emit('closeUpload') },
    async uploadFiles () {
      this.$emit('closeUpload')
      const files = this.selectedFiles
      if (files.length === 0) { return }

      this.uploadDialog = true
      for (let i = 0; i < files.length; i++) {
        this.uploadFileName = files[i].name
        this.uploadFileIndex = (i + 1) + '/' + files.length
        await this.fileuploadservice(i, files[i])
      }
      this.uploadDialog = false
      const { data } = await this.$axios.get('/api/files/refresh')
      this.$store.dispatch('filelist/updateFilelist', data)
    },
    async fileuploadservice (idx, file) {
      await UploadService.upload(file, (event) => {
        this.progressValue = Math.round(100 * event.loaded / event.total)
      })
    }
  }
}
</script>
