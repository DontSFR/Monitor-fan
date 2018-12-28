
<template>
    <Spin fix>
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>加载中...</div>
    </Spin>
</template>

<script>
export default {
  name: 'commonLoad',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
/* 通用loading旋转样式 */
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
</style>
