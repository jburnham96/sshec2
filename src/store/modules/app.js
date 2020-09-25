const state = {
    region: '',
    defaultFsKeyLocation: '',
    defaultUsername: '',
    credentialsFound: false,
    strictHostKeyChecking: true,
    hostNameOverIp: false,
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
    SET_HOST_NAME_OVER_IP(state, payload) {
      state.hostNameOverIp = payload;
    }
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
    setHostNameOverIp({ commit }, payload) {
      commit('SET_HOST_NAME_OVER_IP', payload);
    },
  };
  
  const getters = {
    selectedRegion: state => state.region,
    defaultFsKeyLocation: state => state.defaultFsKeyLocation,
    defaultUsername: state => state.defaultUsername,
    credentialsFound: state => state.credentialsFound,
    strictHostKeyChecking: state => state.strictHostKeyChecking,
    hostNameOverIp: state => state.hostNameOverIp,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  