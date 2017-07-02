// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import axios from 'axios'

require('@/ui/entry.js');
import 'normalize.css'
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    store,
    data: {
        eventBus: new Vue()
    },
    components: { App }
})
