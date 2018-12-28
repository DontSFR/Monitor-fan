export default {
  path: 'taskLog',
  name: 'taskLog',
  chineseName: '任务日志',
  component: r => require.ensure([], () => r(require('Views/taskLog')), 'taskLog'),
  children: [
    {
      path: 'dispatch',
      name: 'dispatch',
      chineseName: '调度日志',
      component: r => require.ensure([], () => r(require('Views/taskLog/dispatch')), 'dispatch')
    },
    {
      path: 'alarmLog',
      name: 'alarmLog',
      chineseName: '告警日志',
      component: r => require.ensure([], () => r(require('Views/taskLog/alarm')), 'alarmLog')
    }
  ]
}
