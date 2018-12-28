<template>
    <div class="common-table my-common-table">
        <Table
          ref="J_base_common_table"
          class="table"
          :columns="columns"
          :data="list"
          :loading="loading"
          :border="border"
          :size="size"
          @on-selection-change="changeSelect"
        ></Table>

        <Page class="page"
          :total="page.total"
          :page-size="page.pageSize"
          show-total
          :current.sync="page.current"
          @on-change="changePage"
          :show-sizer="showSizer"
          @on-page-size-change="changePageSize"
        ></Page>

        <Modal v-model="delModel.show" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:center">
                <span>{{delMsg}}</span>
            </div>
            <div slot="footer">
                <Button type="error" :loading="delModel.loading" @click="del" ghost>确认</Button>
                <Button @click="delModel.show=false">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar'
import mixins from 'Mixins/notice.js'
import COMMON_WORDS from 'COMMON_WORDS'
export default {
  name: 'commonTable',
  mixins: [mixins],
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    showSizer: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array
    },
    list: {
      type: Array
    },
    page: {
      type: Object,
      default () {
        return {
          pageSize: 10,
          total: 1,
          current: 1
        }
      }
    },
    specialChangePage: {
      type: Function
      // default () {}
    },
    queryData: {
      type: Function,
      default () {}
    },
    specialDel: { // 不使用已经写好的删除方法，自定义删除
      type: Function
      // default () {}
    },
    delModel: {
      type: Object,
      default () {
        return {
          show: false,
          loading: false,
          isMulti: false,
          selection: [],
          sendField: 'id',
          id: '',
          ajaxObj: {
            method: 'post',
            url: '',
            isForms: true
          },
          afterDel () {

          }
        }
      }
    },
    handleSelectChange: {
      type: Function,
      default () {}
    }
  },
  // components: { COMMON_WORDS },
  data () {
    return {
      delMsg: COMMON_WORDS.DEL_MSG
    }
  },
  mounted () {
    this.$nextTick(() => {
      let bodys = document.querySelectorAll('.my-common-table .ivu-table-body')
      if (bodys && bodys.length) {
        bodys.forEach(t => {
          Scrollbar.init(t)
        })
      }
    })
  },
  methods: {
    changeSelect (selection) {
      this.handleSelectChange && this.handleSelectChange(selection)
      this.delModel.selection = selection
    },
    del () {
      if (this.specialDel) {
        this.specialDel()
      } else {
        this.delModel.loading = true

        let getId = this.delModel.isMulti ? this.delModel.selection.map(t => {
          return t.id
        }).join() : this.delModel.id

        let sendData = {
          [this.delModel.sendField || 'id']: getId
        }
        if (this.delModel.ajaxObj.method === 'get') {
          this.delModel.ajaxObj.params = sendData
        } else {
          this.delModel.ajaxObj.data = sendData
        }
        this.$ajax({
          method: 'post',
          ...this.delModel.ajaxObj
          // data: {
          //   [this.delModel.sendField || 'id']: getId
          // }
        }).then(result => {
          this.delModel.loading = false
          this.delModel.show = false
          this.delOk()

          this.page.current = this.getTrueCurrent(getId.split(',').length)

          this.queryData()

          if (this.delModel.isMulti) {
            this.$refs.J_base_common_table.selectAll(false)
          }
          this.$emit('after-del')
        }).catch(result => {
          this.delModel.loading = false
          this.delModel.show = false
        })
      }
    },
    getTrueCurrent (num) {
      let lastPage = Math.ceil((this.page.total - num) / this.page.pageSize)
      return (this.page.current <= lastPage || lastPage === 0) ? this.page.current : lastPage
    },
    changePage (num) {
      if (this.specialChangePage) {
        this.specialChangePage(num)
      } else {
        this.page.current = num
        this.queryData(num)
      }
    },
    changePageSize (size) {
      this.page.current = 1
      this.page.pageSize = size
      this.queryData()
    }
  }
}
</script>

<style>
.my-common-table .ivu-table-body{
  height: calc(100% - 40px);
}
</style>

<style lang="less" scoped>
.common-table{
    position: relative;
    height: 100%;
    .table{
        height: calc(~'100% - 55px');
    }
    .page{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
        text-align: center;
    }
}
</style>
