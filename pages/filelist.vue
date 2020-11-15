<template>
  <v-container>
    <v-card>
      <v-card-title class="grey lighten-4">
        FILES
        <v-spacer />
        <v-btn @click="openUploadfileDialog">
          UPLOAD
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="fileListHeaders" :items="filelist" item-key="name">
          <template v-slot:item.duration="{ item }">
            {{ formatTimes(item.duration) }}
          </template>
          <template v-slot:item.size="{ item }">
            {{ formatBytes(item.size) }}
          </template>
          <template v-slot:item.auctions="props">
            <v-btn color="green darken-4" icon @click=Preview(props)>
              <v-icon>mdi-play</v-icon>
            </v-btn>
            <v-btn  color="red darken-4" icon @click=DelFileModalOpen(props)>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <FileUpload :FileUploadDialog='FileUploadDialog' @uploadFile="FileUploadProcess" @CloseDialog="closeFileUploadDialog"></FileUpload>
    <v-dialog v-model="ProgressDialog" max-width="600px" persistent>
      <ProgressPopup :uploadFileIndex = 'uploadFileIndex' :uploadFileName = 'uploadFileName' :progressValue = 'progressValue' />
    </v-dialog>
    <DeleteModal :DelModal="DelModal" :DelFileName="DelFileName" @CloseModal="DelFileModalClose" @FileDelete="DeleteFileProcess"></DeleteModal>
    <v-dialog v-model="Processing" max-width="400px" persistent>
      <ProgressProcess></ProgressProcess>
    </v-dialog>
    <v-dialog v-model="videoDialog" internal-activator max-width="700px" :aspect-ratio="16/9">
      <VideoPreview :videoSource="videoSource" ref="mediaPlayer"></VideoPreview>
    </v-dialog>
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
