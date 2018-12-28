export default {
  path: 'systemManagement',
  name: 'systemManagement',
  chineseName: '系统管理',
  icon: '',
  component: r => require.ensure([], () => r(require('Views/systemManagement')), 'systemManagement'),
  children: [
    {
      path: 'actuator',
      name: 'actuator',
      chineseName: '执行器管理',
      redirect: 'actuator/main',
      icon: '',
      component: r => require.ensure([], () => r(require('@/views/systemManagement/actuator')), 'actuator'),
      children: [
        {
          path: 'main',
          name: 'main',
          component: r => require.ensure([], () => r(require('@/views/systemManagement/actuator/main')), 'main')
        },
        {
          path: 'subtask/:id',
          name: 'subtask',
          component: r => require.ensure([], () => r(require('@/views/systemManagement/actuator/subtask')), 'subtask')
        }
      ]
    },
    {
      path: 'alarm',
      name: 'alarmManagement',
      chineseName: '预警模板管理',
      icon: '',
      component: r => require.ensure([], () => r(require('@/views/systemManagement/alarm')), 'alarm')
    }
  ]
}
