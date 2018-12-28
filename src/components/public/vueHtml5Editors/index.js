import vueHtml5Editor from './src/main'

/* istanbul ignore next */
vueHtml5Editor.install = function (Vue) {
  Vue.component(vueHtml5Editor.name, vueHtml5Editor)
}

export default vueHtml5Editor
