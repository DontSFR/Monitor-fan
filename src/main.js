import Vue from 'vue'
import App from './App'
import router from 'Router'
import inject from 'Plugins/inject.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import GlobalComponets from 'Components/public'
import ServiceComponets from 'Components/servicePublic'
Vue.config.productionTip = false

Vue.use(iView)
Vue.use(inject)
Vue.use(ServiceComponets)
Vue.use(GlobalComponets)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
