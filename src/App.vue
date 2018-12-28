<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="less">
// 未加scoped，慎加样式
@import '~Styles/font.less';
@import '~Styles/basic.less';
#app {
    height: 100%;
}
</style>
