<template>
  <div class="entry-container">
    <my-aside class="aside"></my-aside>
    <div class="content">
      <my-header class="header"></my-header>
      <div class="entry-main">
          <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="less" scoped>
@import '~Styles/default.less';
.entry-container{
  height: 100%;
}
</style>
