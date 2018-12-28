<template>
    <Modal v-model="value.show" width="360">
        <p slot="header" style="text-align:center">
            <Icon type="information-circled"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <span>{{msg}}</span>
        </div>
        <div slot="footer">
            <Button type="info" :loading="value.loading" @click="confirm" ghost>确认</Button>
            <Button @click="cancel">取消</Button>
        </div>
    </Modal>
</template>

<script>
export default {
  name: 'commonConfirm',
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
    msg: {
      type: String,
      default: '确认操作吗？'
    },
    confirm: {
      type: Function,
      default () {}
    }
  },
  data () {
    return {
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
