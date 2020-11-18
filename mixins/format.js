export const dataFormat = {
  methods: {
    bytes (bytes, decimals = 2) {
      if (bytes === 0) { return '0 Bytes' }
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    times (milliseconds) {
      const time = new Date(milliseconds * 1000)
      let hours = time.getUTCHours()
      let minutes = time.getUTCMinutes()
      let seconds = time.getUTCSeconds()

      hours = (hours < 10) ? ('0' + hours) : hours
      minutes = (minutes < 10) ? ('0' + minutes) : minutes
      seconds = (seconds < 10) ? ('0' + seconds) : seconds
      return `${hours}:${minutes}:${seconds}`
    }
  }
}
