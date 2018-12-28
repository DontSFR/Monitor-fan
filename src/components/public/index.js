// 所有项目的基础组件，脱离业务的通用组件，跟业务相关的请放入servicePublic
const publicComponents = ['commonTable/main.vue', 'commonForm/main.vue', 'commonContent/main.vue',
  'commonLoad/main.vue', 'timeRange/main.vue', 'vueHtml5Editors',
  'commonDel', 'commonTip', 'commonConfirm'
]

const components = publicComponents.map((t) => {
  var str = require('./' + t)
  return str.default
})

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return

  components.map(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};

export default {
  version: '1.2.7',
  install,
  ...components
}
