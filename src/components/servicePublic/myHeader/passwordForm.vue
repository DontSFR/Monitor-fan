<template>
    <Modal v-model="value" :width="410" :closable="false" :mask-closable="false" @on-visible-change="changeStatus">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>重置密码</span>
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="95">
            <FormItem label="输入密码" prop="password">
                <Input v-model="formValidate.password" type="password" placeholder="限制20个字符以内,内容只能包含字母数字下划线"></Input>
            </FormItem>
            <FormItem label="再次输入密码" prop="rePass">
                <Input v-model="formValidate.rePass" type="password" placeholder="限制20个字符以内,内容只能包含字母数字下划线"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="close">关闭</Button>
            <Button type="primary" size="large" :loading="loading" @click="confirm">确定</Button>
        </div>
    </Modal>
</template>

<script>
import validate from 'Plugins/asyncValidate'
import mixins from 'Mixins/notice.js'
// import md5 from 'md5'
export default {
  mixins: [mixins],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formValidate: {
        password: '',
        rePass: ''
      },
      ruleValidate: {
        password: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { ...validate.pattern.specialRule(), trigger: 'blur' },
          { max: 20, message: '限制20个字符以内' }
        ],
        rePass: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { ...validate.pattern.specialRule(), trigger: 'blur' },
          { max: 20, message: '限制20个字符以内' }
        ]
      },
      loading: false
    }
  },
  methods: {
    changeStatus (status) {
      if (!status) {
        this.$refs.formValidate.resetFields()
      }
    },
    close () {
      this.$emit('input', false)
    },
    confirm () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          if (this.formValidate.password === this.formValidate.rePass) {
            this.loading = true

            this.$ajax({
              method: 'get',
              // url: '/api/system/user/updatePassword',
              params: {
                id: this.$base.config.userId || localStorage.getItem('systemUserId'),
                password: this.formValidate.password
                // md5()
              }
            }).then(result => {
              this.saveOk()
              this.close()
              this.loading = false
            }).catch(result => {
              this.loading = false
            })
          } else {
            this.passwordRepeat()
          }
        } else {
          this.formFail()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
