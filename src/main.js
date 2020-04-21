import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize';
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import localizeFilter from './filters/localize.filter';
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin';
import Loader from '@/components/app/Loader';


import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);


firebase.initializeApp({
  apiKey: "AIzaSyAVDMLtqnvbNAPquis3gdynbxKftiUGB_Q",
  authDomain: "vue-crm-vue.firebaseapp.com",
  databaseURL: "https://vue-crm-vue.firebaseio.com",
  projectId: "vue-crm-vue",
  storageBucket: "vue-crm-vue.appspot.com",
  messagingSenderId: "140433236888",
  appId: "1:140433236888:web:130e14dd7593aac34241ed"
})
let app
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

