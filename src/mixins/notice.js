// 通知类方法集合
import COMMON_WORDS from 'COMMON_WORDS'

export default {
  methods: {
    // 保存成功
    saveOk () {
      this.$Notice.success({
        title: COMMON_WORDS.SAVE_OK,
        duration: 3
      })
    },
    // 保存失败
    saveFail () {
      this.$Notice.error({
        title: COMMON_WORDS.SAVE_FAIL,
        duration: 3
      })
    },
    // 批量操作报错
    multTip () {
      this.$Notice.error({
        title: COMMON_WORDS.MULT_TIP,
        duration: 3
      })
    },
    // 删除成功
    delOk () {
      this.$Notice.success({
        title: COMMON_WORDS.DEL_OK,
        duration: 3
      })
    },
    // 删除失败
    delFail () {
      this.$Notice.error({
        title: COMMON_WORDS.DEL_FAIL,
        duration: 3
      })
    },
    // 只能输入正整数
    positiveInteger () {
      this.$Notice.success({
        title: COMMON_WORDS.POSITIVE_INTEGER,
        duration: 3
      })
    },
    // 密码重复
    passwordRepeat () {
      this.$Notice.error({
        title: COMMON_WORDS.PASSWORD_REPEAT,
        duration: 3
      })
    },
    // 表单校验未通过
    formFail () {
      this.$Notice.error({
        title: COMMON_WORDS.FORM_FAIL,
        duration: 3
      })
    },
    // 更新成功
    updateSuccessful () {
      this.$Notice.success({
        title: COMMON_WORDS.UPDATE_SUCCESSFUL,
        duration: 3
      })
    },
    // 上传成功
    uploadSuccess () {
      this.$Notice.success({
        title: COMMON_WORDS.UPLOAD_SUCCESS,
        duration: 3
      })
    },
    // 上传失败
    uploadFail () {
      this.$Notice.error({
        title: COMMON_WORDS.UPLOAD_FAIL,
        duration: 3
      })
    },
    // 上传格式不正确
    uploadFormatError () {
      this.$Notice.warning({
        title: COMMON_WORDS.UPLOAD_FORMAT_ERROR,
        duration: 3
      })
    },
    // 上传大小不正确
    uploadOversize () {
      this.$Notice.warning({
        title: COMMON_WORDS.UPLOAD_OVERSIZE,
        duration: 3
      })
    }
  }
}
