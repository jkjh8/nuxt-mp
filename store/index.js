import Vuex from 'vuex'
import playlist from './playlist/index.js'
import filelist from './filelist/index.js'

const store = () => {
  return new Vuex.Store({
    modules: {
      playlist,
      filelist
    }
  })
}

export default store
