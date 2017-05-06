/* eslint-disable */
import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
require('smoothscroll-polyfill').polyfill();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
});
