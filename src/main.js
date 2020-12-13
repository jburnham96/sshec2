import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTerminal, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTerminal, faTimesCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

process.on('unhandledRejection', (error) => {
  console.error(error)
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
