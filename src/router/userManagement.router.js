export default {
  path: 'userManagement',
  name: 'userManagement',
  chineseName: '用户管理',
  icon: '',
  component: r => require.ensure([], () => r(require('Views/userManagement')), 'userManagement'),
  children: [
    {
      path: 'staff',
      name: 'staff',
      chineseName: '人员管理',
      icon: '',
      component: r => require.ensure([], () => r(require('Views/userManagement/staff')), 'staff')
    },
    {
      path: 'account',
      name: 'account',
      chineseName: '账户管理',
      icon: '',
      component: r => require.ensure([], () => r(require('Views/userManagement/account')), 'account')
    }
  ]
}
