<template>
    <div class="menu-aside">
        <div class="user-box">
          <Dropdown>
            <img class="portrait" src="~Assets/pai.jpg">
            <DropdownMenu slot="list">
              <DropdownItem @click.native="value=true">重置密码</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div class="user-txt">
            <p class="name">{{userName||'暂无'}}</p>
          </div>
        </div>
        <div class="menu-tree" id="J_menu_aside">
          <Menu
            ref="menuAside"
            :active-name="activeName"
            :open-names="[openName]"
          >
              <Submenu v-for="t in showMenu" :key="t.name" :name="t.name">
                  <template slot="title">
                      <!-- <i :class="t.iconStyle"></i> -->
                      {{t.chineseName}}
                  </template>
                  <MenuItem
                      v-if="t.children && t.children.length"
                      v-for="tt in t.children"
                      :key="tt.name"
                      :name="tt.name"
                  >
                      <router-link :to="{path:tt.menuUrl}" class="menu-link">
                          <!-- <i :class="t.iconStyle"></i> -->
                          <span>{{tt.chineseName}}</span>
                      </router-link>
                  </MenuItem>
              </Submenu>
          </Menu>
        </div>
    </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar'
export default {
  name: 'myAside',
  data () {
    return {
      activeName: '',
      openName: '',
      showMenu: [],
      userName: this.$base.config.username || localStorage.getItem('systemUserName'),
      activeArr: []
    }
  },
  mounted () {
    this.init()
    this.findActive()
  },
  watch: {
    $route: {
      deep: true,
      // immediate: true,
      handler: function () {
        this.findActive()
      }
    }
  },
  methods: {
    init () {
      this.showMenu = this.renderData(require('Router').default.options.routes[0].children)
      // console.log(this.showMenu)
      this.$nextTick(() => {
        Scrollbar.init(document.querySelector('#J_menu_aside'))
      })
    },
    renderData (data, prefix) {
      return data.map(t => {
        return {
          ...t,
          menuUrl: `${prefix || ''}/${t.path}`,
          children: (t.children && t.children.length) ? this.renderData(t.children, `${prefix || ''}/${t.path}`) : []
        }
      })
    },
    findActive () {
      this.activeArr = []
      this.findActiveSingle(this.showMenu)

      // 菜单为两层，第一个值为打开的菜单name，第二个是高亮项的name
      this.activeName = this.activeArr[1]
      this.openName = this.activeArr[0]

      this.updateActive()
    },
    findActiveSingle (data) {
      data.forEach(t => {
        let arr = this.$route.path.split('/')
        arr.shift()
        if (arr.find(item => item === t.path)) {
          this.activeArr.push(t.name)
        }
        if (t.children && t.children.length) {
          this.findActiveSingle(t.children)
        }
      })
    },
    updateActive () {
      this.$nextTick(() => {
        if (this.$refs.menuAside) {
          this.$refs.menuAside.updateActiveName()
          this.$refs.menuAside.updateOpened()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
