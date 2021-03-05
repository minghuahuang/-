import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

const state = {
    message: 'hello store',
};
const mutations = {
    
};
const actions = {

};

export default new Store({
    state,
    mutations,
    actions
})