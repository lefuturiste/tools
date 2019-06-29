// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import {store} from './store'
import 'vuetify/dist/vuetify.min.css'
import VueClipboards from 'vue-clipboards';
import SettingsDialog from './components/SettingsDialog';
import Storage from 'vue-ls';

Vue.use(VueClipboards);
Vue.use(Vuetify)
Vue.component('setting-dialog', SettingsDialog)
Vue.use(Storage, {
    namespace: 'lefuturiste-tools__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
