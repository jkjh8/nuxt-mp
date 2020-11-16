const state = () => ({
  filelist: []
})

const mutations = {
  updateFilelist (state, payload) {
    state.filelist = payload
  }
}

const actions = {
  updateFilelist ({ commit }, payload) {
    commit('updateFilelist', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
