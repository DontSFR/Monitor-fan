<template>
    <header class="header" :style="headStyle">
      <h2 class="title">
        <a>
          {{$base.config.systemTitle}}
        </a>
        <!-- <router-link :to="{path:'/bootPage'}"></router-link> -->
      </h2>

      <span class="system-name">{{systemName}}</span>

      <div class="aside-info">
        <span class="now-time">{{nowTime}}</span>
        <!-- <Dropdown class="user-dropdown">
            <span class="user-name">
                <Avatar class="avatar" :src="$base.config.avatar||defaultAvatar"/>
                {{userName||'加载中...'}}
                <Icon type="ios-arrow-down"></Icon>
            </span>
            <DropdownMenu slot="list">
                <DropdownItem @click.native="value=true">重置密码</DropdownItem>
            </DropdownMenu>
        </Dropdown> -->
        <logout :className="$base.config.className"></logout>
      </div>
      <password-form v-model="value"></password-form>
    </header>
</template>

<script>
// import baseFunc from 'js/base/index'
import passwordForm from './passwordForm.vue'
import { getSystemTime, getNowDate } from 'Plugins/util.js'
export default {
  name: 'myHeader',
  data () {
    return {
      defaultAvatar: require('Assets/user.png'),
      backImg: this.$base.config.headerBack ? require('Assets/' + this.$base.config.headerBack) : '',
      systemName: '',
      userName: this.$base.config.username || localStorage.getItem('systemNickName'),
      nowTime: getNowDate(),
      timer: null,
      value: false // 重置密码弹窗
    }
  },
  components: { passwordForm },
  mounted () {
    this.init()
    this.initTitle()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  watch: {
    '$route' () {
      this.initTitle()
    }
  },
  computed: {
    headStyle () {
      return this.backImg ? {
        backgroundImage: `url(${this.backImg})`
      } : {}
    }
  },
  methods: {
    async init () {
      let _getSystemTime = getSystemTime.bind(this)
      let startDate = await _getSystemTime() || (new Date()).getTime()
      this.timer = setInterval(() => {
        startDate += 1000
        this.nowTime = getNowDate(startDate)
      }, 1000)
    },
    initTitle () {
      if (this.$route.matched.length > 1) {
        let arr = this.$base.config.system.filter(t => {
          return ('/' + t.type) === this.$route.matched[1].path
        })
        this.systemName = arr.length ? arr[0].name : ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
