const state = {
    region: '',
    defaultFsKeyLocation: '',
    defaultUsername: '',
  };
  
  const mutations = {
    SET_REGION(state, payload) {
      state.region = payload;
    },
    SET_DEFAULT_KEY_LOCATION(state, payload) {
      state.defaultFsKeyLocation = payload;
    },
    SET_DEFAULT_USERNAME(state, payload) {
      state.defaultUsername = payload;
    },
  };
  
  const actions = {
    setRegion({ commit }, payload) {
      commit('SET_REGION', payload);
    },
    setDefaultFsKeyLocation({ commit }, payload) {
      commit('SET_DEFAULT_KEY_LOCATION', payload);
    },
    setDefaultUsername({ commit }, payload) {
      commit('SET_DEFAULT_USERNAME', payload);
    }
  };
  
  const getters = {
    selectedRegion: state => state.region,
    defaultFsKeyLocation: state => state.defaultFsKeyLocation,
    defaultUsername: state => state.defaultUsername,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  