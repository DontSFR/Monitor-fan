<template>
    <Modal v-model="value.show" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <span>{{delMsg}}</span>
        </div>
        <div slot="footer">
            <Button type="error" :loading="value.loading" @click="del" ghost>确认</Button>
            <Button @click="cancel">取消</Button>
        </div>
    </Modal>
</template>

<script>
import COMMON_WORDS from 'COMMON_WORDS'
export default {
  name: 'commonDel',
  props: {
    value: {
      type: Object,
      default () {
        return {
          show: false,
          loading: false
        }
      }
    },
    del: {
      type: Function,
      default () {}
    }
  },
  data () {
    return {
      delMsg: COMMON_WORDS.DEL_MSG
    }
  },
  methods: {
    cancel () {
      this.$emit('input', {
        ...this.value,
        show: false
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
