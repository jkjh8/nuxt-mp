<template>
  <v-card>
    <v-card-title>
      UPLOADING
    </v-card-title>
    <v-card-text>
      <v-container class="text-center">
        <v-progress-circular
          size="150"
          width="10"
          color="primary"
          indeterminate
        >
          {{ uploadFileIndex }}
        </v-progress-circular>
      </v-container>
      <v-card-actions>
        <v-container>
          {{ uploadFileName + "    " + progressValue + "%" }}
        </v-container>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    uploadFileIndex: { type: String, default: null },
    uploadFileName: { type: String, default: null },
    progressValue: { type: Number, default: null }
  }
}
</script>
