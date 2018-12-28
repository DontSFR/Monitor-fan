<template>
    <div class="common-content">
        <common-form v-if="model.data&&model.data.length" class="search-form" ref="thisSearchForm" :model="model" :forms="forms">
            <Col span="4" slot="btns">
                <Button type="info" class="search-btn" @click="search">搜索</Button>
                <Button type="default" @click="resetForm" v-show="formBtns.reset">重置</Button>
            </Col>
        </common-form>
        <p class="operate-bar" v-if="operateBtns.show">
          <slot name="extraBtns"></slot>
          <Button class="btn" v-if="operateBtns.add&&operateBtns.add.show" type="primary" @click="handleAdd" ghost>
              <Icon class="icon-style" :type="operateBtns.add.icon" />
              {{operateBtns.add.text}}
          </Button>
          <Button class="btn" v-if="operateBtns.deleteAll&&operateBtns.deleteAll.show" type="warning" @click="deleteAll" ghost>
              <Icon class="icon-style" :type="operateBtns.deleteAll.icon" />
              {{operateBtns.deleteAll.text}}
          </Button>
          <Button class="btn" v-if="operateBtns.checkAll&&operateBtns.checkAll.show" type="default" @click="checkAll" ghost>
              <Icon class="icon-style" :type="operateBtns.checkAll.icon" />
              {{operateBtns.checkAll.text}}
          </Button>
          <!-- <Button v-if="operateBtns.imports&&operateBtns.imports.show" @click=""><Icon :type="operateBtns.imports.icon"></Icon> {{operateBtns.imports.text}}</Button> -->
          <Button class="btn" v-if="operateBtns.exports&&operateBtns.exports.show" type="success" @click="exportTable" ghost>
              <Icon class="icon-style" :type="operateBtns.exports.icon" />
              {{operateBtns.exports.text}}
          </Button>
          <Button class="btn" v-if="operateBtns.refresh&&operateBtns.refresh.show" type="info" @click="queryData()" ghost>
              <Icon class="icon-style" :type="operateBtns.refresh.icon" />
              {{operateBtns.refresh.text}}
          </Button>
        </p>

        <common-table
            class="contnet-table-set"
            :border="true"
            :loading="loading"
            :delModel="delModel"
            :columns="sendColumn"
            :queryData="queryData"
            :list="list"
            :page="page"
        ></common-table>

        <!-- 审核对话框 -->
        <Modal
            v-model="check.modal"
            title="审核"
            @on-visible-change="changeCheckStatus"
            width="400">
            <Form ref="checkForm" :model="check.forms" :rules="check.ruleValidate" :label-width="100">
                <FormItem label="审核结果：" prop="check_result">
                  <RadioGroup v-model="check.forms.check_result">
                      <Radio label="0">退回</Radio>
                      <Radio label="1">通过</Radio>
                  </RadioGroup>
                </FormItem>

                <FormItem label="审核意见：" prop="check_idea">
                  <Input v-model="check.forms.check_idea" type="textarea" :rows="4"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
              <Button type="info" size="large" long :loading="check.loading" @click="submitCheck">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import mixins from 'Mixins/notice.js'
export default {
  name: 'commonContent',
  mixins: [mixins],
  props: {
    isJump: {
      type: Boolean,
      default: true
    },
    jumpLink: { // 跳转的链接主体，不需要加add或者edit和id，由组件内部增加
      type: String,
      default: ''
    },
    addFunc: {
      type: Function,
      default () {}
    },
    editFunc: {
      type: Function,
      default () {}
    },
    urls: {
      type: Object,
      default () {
        return {
          query: '',
          del: '',
          check: '',
          export: ''
        }
      }
    },
    model: {
      type: Object,
      default () {
        return {
          data: []
        }
      }
    },
    forms: {
      type: Object,
      default () {
        return {}
      }
    },
    formBtns: {
      type: Object,
      default () {
        return {
          reset: true
        }
      }
    },
    mountedCondition: { // mounted请求query的条件
      type: Function,
      default () {
        return true
      }
    },
    beforeSend: { // 发送ajax之前的跳转方法
      type: Function,
      default () {}
    },
    operateBtns: {
      type: Object,
      default () {
        return {
          show: true,
          add: {
            show: true,
            icon: 'md-add',
            text: '新增'
          },
          deleteAll: {
            show: true,
            icon: 'md-trash',
            text: '批量删除'
          },
          checkAll: {
            show: false,
            icon: 'md-checkmark-circle-outline',
            text: '批量审核'
          },
          exports: {
            show: true,
            icon: 'md-log-out',
            text: '导出'
          },
          refresh: {
            show: true,
            icon: 'md-refresh',
            text: '刷新'
          }
        }
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    tableOperates: {
      type: Object,
      default () {
        return {
          length: 125,
          btns: {
            edit: true,
            del: true,
            check: false
          }
        }
      }
    },
    otherTableBtns: {
      type: Function,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      loading: false,
      list: [],
      page: {
        pageSize: 10,
        total: 1,
        current: 1
      },
      check: {
        isCheckAll: false,
        id: '',
        modal: false,
        loading: false,
        forms: {
          check_result: '',
          check_idea: ''
        },
        ruleValidate: {
          check_result: [
            { required: true, message: '必填项不能为空', trigger: 'blur' }
          ]
        }
      },
      delModel: {
        show: false,
        loading: false,
        isMulti: false,
        selection: [],
        id: '',
        ajaxObj: {
          method: 'get'
          // url:
        }
      }
    }
  },
  computed: {
    sendColumn () {
      let data = this.columns.concat([
        {
          title: '操作',
          key: 'action',
          width: this.tableOperates.length,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              this.tableOperates.btns.edit ? h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.handleEdit(params)
                  }
                }
              }, '编辑') : '',
              this.tableOperates.btns.check ? h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                  }
                }
              }, '审核') : '',
              this.tableOperates.btns.del ? h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showDel(params.row.id)
                  }
                }
              }, '删除') : '',
              this.otherTableBtns(h, params)
            ])
          }
        }
      ])
      data.forEach(t => {
        if (t.initRender) {
          t.render = (h, params) => {
            return h('div', t.initRender(params).map(tt => {
              return h(
                tt.tag,
                tt.param,
                tt.name || params.row[t.key]
              )
            }))
          }
        }
      })
      return data
    }
  },
  mounted () {
    if (this.mountedCondition()) {
      this.queryData()
    }
  },
  methods: {
    search () {
      this.page.current = 1
      this.queryData()
    },
    async queryData (current) {
      this.loading = true
      let obj = (this.beforeSend && this.beforeSend()) || this.forms
      let data = await this.$ajax({
        method: 'post',
        // url: this.urls.query,
        data: {
          ...obj,
          pageSize: this.page.pageSize,
          currentPage: current || this.page.current
        }
      }).catch(result => {
        this.loading = false
      })
      this.list = data.data
      this.page.total = data.count
      this.loading = false
    },
    handleAdd () {
      if (this.isJump) {
        window.open(`${this.jumpLink}/add`)
      } else {
        this.addFunc()
      }
    },
    handleEdit (params) {
      if (this.isJump) {
        window.open(`${this.jumpLink}/edit/${params.row.id}`)
      } else {
        this.editFunc(params)
      }
    },
    resetForm () {
      this.$refs.thisSearchForm.$emit('resetCommonForm')
    },
    showDel (id) {
      this.delModel.id = id
      this.delModel.isMulti = false
      this.delModel.selection = []
      this.delModel.show = true
    },
    deleteAll () {
      if (this.delModel.selection.length) {
        this.delModel.isMulti = true
        this.delModel.show = true
      } else {
        this.multTip()
      }
    },
    checkAll () {

    },
    changeCheckStatus (status) {
      if (status) {

      }
    },
    submitCheck () {

    },
    exportTable () {
      let obj = (this.beforeSend && this.beforeSend()) || this.forms
      let str = ''
      for (let attr in obj) {
        str += attr + '=' + obj[attr] + '&'
      }
      window.location.href = `${this.urls.export}?${str}`
    }
  }
}
</script>

<style lang="less" scoped>
.common-content{
    height: 100%;
    overflow: hidden;
    .search-form{
      float: left;
      width: 100%;
      padding: 10px 0 0;
      line-height: 1;
      margin-bottom: 10px;
      border-bottom: 1px solid #e8eaec;
      .search-btn{
        margin: 0 5px 0 10px;
      }
      /deep/ .ivu-form-item{
        margin-bottom: 10px;
      }
    }
    .operate-bar{
      min-height: 63px;
      padding: 10px;
      .btn{
        margin-right: 3px;
      }
      .icon-style{
        position: relative;
        top: -1px;
        font-size: 15px;
        margin-right: 2px;
      }
    }
    .contnet-table-set{
      clear: both;
      height: calc(~'100% - 110px')!important;
      padding: 0 10px;
    }
}
</style>
