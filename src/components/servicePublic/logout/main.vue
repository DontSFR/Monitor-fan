<template>
    <span class="logout">
        <Poptip
            confirm
            title="确认退出吗？"
            @on-ok="logout"
            placement="bottom-end">
            <i class="no-name-logout"></i>
            <!-- <Icon class="icon" type="md-log-out" /> -->
        </Poptip>
    </span>
</template>

<script>
export default {
  name: 'logout',
  data () {
    return {
      name: 'toLogout'
    }
  },
  methods: {
    logout () {
      // if (this.$base.isSSO) {
      //   window.location.href = '/api/logout'
      // } else {
      this.$Notice.info({
        name: this.name,
        title: '即将跳转到登录页，请稍候...'
      })
      // this.$ajax({
      //   method: 'get'
      //   // url: '/api/exit'
      // }).then(result => {
      this.$Notice.close(this.name)
      this.$router.push({path: '/login', query: { url: this.$base.config.firstLink }})
      // })
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.logout{
    cursor: pointer;
    /deep/.ivu-poptip-body-message{
        color: #333;
        letter-spacing: 0;
    }
    /deep/.ivu-poptip,
    /deep/.ivu-poptip-rel{
      line-height: 1;
    }
    .icon{
      &:after{
        content: '退出';
        position: relative;
        top: -1px;
        margin-left: 3px;
      }
    }
    .no-name-logout{
      float: right;
      display: inline-block;
      width: 80px;
      height: 80px;
      background: url('~Assets/logout.png') center center no-repeat;
    }
}
</style>
