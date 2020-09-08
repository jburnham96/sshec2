import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTerminal } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTerminal)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

process.on('unhandledRejection', (error) => {
  console.error(error)
});

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
