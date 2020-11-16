const state = () => ({
  playlistId: 0
})

const mutations = {
  updatePlaylistId (state, payload) {
    state.playlistId = payload
  }
}

const actions = {
  updatePlaylistId ({ commit }, payload) {
    commit('updatePlaylistId', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
