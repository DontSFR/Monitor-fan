<template>
  <div v-show="tipData.show" class="tip-content">
    <p class="title"><span>{{tipData.title}}</span>
      <Icon style="float:right" @click="close" type="ios-close" size="30"/>
    </p>
    <p class="txt">{{tipData.content}}</p>
  </div>
</template>

<script>
export default {
  name: 'commonTip',
  props: {
    tipData: {
      type: Object,
      default () {
        return {
          show: false
        }
      }
    }
  },
  data () {
    return {
      count: 0,
      timer: null
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  watch: {
    'tipData.show' () {
      this.init()
    }
  },
  methods: {
    init () {
      if (this.tipData.show) {
        const TIME_COUNT = this.tipData.duration
        if (!this.timer) {
          this.count = this.tipData.duration
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              clearInterval(this.timer)
              this.close()
            }
          }, 1000)
        }
      }
    },
    close () {
      this.tipData.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.tip-content{
  position: absolute;
  top: 89px;
  left: 36.2%;
  margin: 10px;
  padding: 10px;
  width: 362px;
  height: 160px;
  z-index: 1001;
  background: #ffffff;
  border-radius: 5px;
  border:1px solid #e8eaec;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  transition: all ease 1s;
  .title{
    height: 40px;
    text-align: center;
    padding: 4px 16px 16px;
    border-bottom: 1px solid #e8eaec;
    span{
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      color: rgb(255, 102, 0);
    }
  }
  .txt{
    font-size: 13px;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
