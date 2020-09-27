const state = {
    region: '',
    defaultFsKeyLocation: '',
    defaultUsername: '',
    credentialsFound: false,
    strictHostKeyChecking: true,
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
    SET_CREDENTIALS_FOUND(state, payload) {
      state.credentialsFound = payload;
    },
    SET_STRICT_HOST_KEY_CHECKING(state, payload) {
      state.strictHostKeyChecking = payload;
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
    },
    setCredentialsFound({ commit }, payload) {
      commit('SET_CREDENTIALS_FOUND', payload);
    },
    setStrictHostKeyChecking({ commit }, payload) {
      commit('SET_STRICT_HOST_KEY_CHECKING', payload);
    },
  };
  
  const getters = {
    selectedRegion: state => state.region,
    defaultFsKeyLocation: state => state.defaultFsKeyLocation,
    defaultUsername: state => state.defaultUsername,
    credentialsFound: state => state.credentialsFound,
    strictHostKeyChecking: state => state.strictHostKeyChecking,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  