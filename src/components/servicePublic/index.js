// 业务相关的通用组件
const publicComponents = [
  'myHeader/main.vue',
  'myAside/main.vue',
  'logout/main.vue'
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
