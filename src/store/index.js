import Vue from "vue"
import Vuex from "vuex"
import { createPersistedState } from "vuex-electron"

import region from './modules/app';

Vue.use(Vuex)

export default new Vuex.Store({
  ...region,
  plugins: [
    createPersistedState(),
  ],
});