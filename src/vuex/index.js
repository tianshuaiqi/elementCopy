import Vue from 'vue';
import Vuex from 'vuex';
import state from './state'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const Store = new Vuex.Store({
    state,
    mutations,
    actions
});
export default Store;
