const state = {
    // region should be set to defualt on load
    region: '',
  };
  
  const mutations = {
    SET_REGION(state, payload) {
      state.region = payload;
    },
  };
  
  const actions = {
    setRegion({ commit }, payload) {
      commit('SET_REGION', payload);
    },
  };
  
  const getters = {
    selectedRegion: state => state.region,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  