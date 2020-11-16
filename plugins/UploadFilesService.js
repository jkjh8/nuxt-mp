import axios from 'axios'

class UploadFilesService {
  async upload (file, onUploadProgress) {
    const formData = new FormData()
    formData.append('file', file)
    return await axios.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
  }
}

export default new UploadFilesService()
