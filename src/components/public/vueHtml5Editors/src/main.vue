<template>
  <div class="editor">

    <vue-html5-editor v-if="selected==='first'" :content="content" @change="change1" :height="200" :auto-height="true" :show-module-name="false"></vue-html5-editor>
    <!-- <VueUEditor @ready="editorReady" style="width: 375px"></VueUEditor> -->

   <!-- <div v-show="cont==' '">
    <vue-ueditor-wrap2   style="width:375px"
      :init="myInit" :destroy="true"

      v-model="cont"></vue-ueditor-wrap2></div> -->
      <div v-if="selected==='second'">
          <vue-ueditor-wrap
      :init="myInit" :destroy="true"

      v-model="cont"></vue-ueditor-wrap></div>

  </div>
</template>

<script>
// import VueUEditor from './ue'
import VueUeditorWrap from './ue1'
// import VueUeditorWrap2 from './ue2'
export default {
  name: 'vueHtml5Editors',
  components: { VueUeditorWrap },
  props: {
    change: {
      type: Function,
      default () {}
    },
    content: {
      type: String,
      default () {
        return ' '
      }
    }
  },
  data () {
    return {
      selected: 'first',
      cont: ' ',
      isFirst: false
    }
  },
  watch: {
    cont (val) {
      this.$emit('change', val)
    },
    content (val) {
      // console.log('content发生了一次变化', val)
      this.cont = val
      this.isFirst = true
    }
  },
  methods: {
    change1 (content) {
      let _content = this.exp(content)
      // this.editorReady(_content)
      this.$emit('change', _content)
      // this.cont = _content
    },
    exp (item) {
      var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\\A9|\\AE]\u3030|\uA9|\uAE|\u3030/gi
      if (regStr.test(item)) {
        return item.replace(regStr, '')
      } else {
        return item
      }
    },
    editorReady (editorInstance) {
      editorInstance.setContent(this.content)
      editorInstance.addListener('contentChange', () => {
        this.$emit('change', editorInstance.getContent())
        // console.log('编辑器内容发生了变化：', editorInstance.getContent())
      })
    },
    myInit () {
      window.UE.registerUI(
        '135editor',
        function (editor, uiName) {
          var dialog = new window.UE.ui.Dialog({
            iframeUrl:
              editor.options.UEDITOR_HOME_URL +
              'dialogs/135editor/135editor.html',
            editor: editor,
            name: uiName,
            title: '135编辑器'
          })
          dialog.fullscreen = true
          dialog.draggable = false
          var btn = new window.UE.ui.Button({
            name: 'btn-dialog-' + uiName,
            className: 'edui-for-135editor',
            title: '135编辑器',
            onclick: function () {
              dialog.render()
              dialog.open()
            }
          })
          return btn
        },
        undefined
      )

      window.UE.registerUI(
        '图片上传工具',
        function (editor, uiName) {
          var dialog = new window.UE.ui.Dialog({
            iframeUrl:
              editor.options.UEDITOR_HOME_URL +
              'dialogs/136editor/136editor.html',
            editor: editor,
            name: uiName,
            title: '图片上传工具',
            cssRules: 'width:130px;height:130px;'
          })
          dialog.draggable = false
          var btn = new window.UE.ui.Button({
            name: 'btn-dialog-' + uiName,
            className: 'edui-for-136editor',
            title: '图片上传工具',
            onclick: function () {
              dialog.render()
              dialog.open()
            }
          })
          return btn
        },
        undefined
      )
    },
    ready (editorInstance) {
      console.log(`你要的实例${editorInstance.key}: `, editorInstance)
    }
  },
  mounted () {
    function getQuery (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)// 从?之后开始匹配如getQuery(courseid)返回一个数组["courseid=8","","8","&",index:0,input:"courseid=8"]
      if (r != null) return unescape(r[2]); return null
    }
    if (getQuery('editor') === '1') {
      this.selected = 'second'
    }
    // setTimeout(() => {
    //   this.cont = this.content
    // })
  }
}
</script>

<style lang="less" >
.editor {
    .toolbar {
    z-index: 899 !important;
}
  img {
    max-width: 100% !important;
  }
}
</style>
