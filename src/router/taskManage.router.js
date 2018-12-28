export default {
  path: 'taskManage',
  name: 'taskManage',
  chineseName: '任务管理',
  icon: '',
  component: r => require.ensure([], () => r(require('Views/taskManage')), 'taskManage'),
  // () => import(/* webpackChunkName: "about" */ 'Views/taskManage'),
  children: [
    {
      path: 'classify',
      name: 'classify',
      chineseName: '分类管理',
      icon: '',
      component: r => require.ensure([], () => r(require('Views/taskManage/classify')), 'classify')
    },
    {
      path: 'task',
      name: 'task',
      chineseName: '任务管理',
      icon: '',
      component: r => require.ensure([], () => r(require('Views/taskManage/task')), 'task')
    }
  ]
}
