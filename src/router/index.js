import Vue from 'vue'
import Router from 'vue-router'
import taskManage from './taskManage.router.js'
import systemManagement from './systemManagement.js'
import userManagement from 'Router/userManagement.router.js'
import taskLog from 'Router/taskLog.router.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: r => require.ensure([], () => r(require('Views')), 'index'),
      children: [
        taskManage,
        systemManagement,
        userManagement,
        taskLog
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: r => require.ensure([], () => r(require('Views/login')), 'login')
    }
  ]
})
