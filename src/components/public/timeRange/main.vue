<template>
    <div class="date-range">
        <DatePicker type="datetime" style="width:47%" :options="startOptions" placeholder="开始时间" v-model='startvalue'></DatePicker>
        <span>-</span>
        <DatePicker type="datetime" style="width:47%" :options="endOptions" placeholder="结束时间" v-model='endvalue'></DatePicker>
    </div>
</template>
<script>
import format from '@/plugins/format.js'
export default {
  name: 'dateRange',
  data () {
    return {
      startLimit: '',
      endLimit: '',
      startvalue: '',
      endvalue: ''
    }
  },
  computed: {
    startOptions: function () {
      let limitTime = this.endLimit
      return {
        disabledDate (time) {
          return time > new Date(limitTime)
        }
      }
    },
    endOptions: function () {
      let limitTime = this.startLimit
      return {
        disabledDate (time) {
          return time < new Date(limitTime)
        }
      }
    }
  },
  watch: {
    startvalue (v) {
      this.startLimit = format(v, 'YYYY-MM-DD hh:mm:ss')
      this.$emit('on-from-date-range', {
        key: 'startTime',
        value: v
      })
    },
    endvalue (v) {
      this.endLimit = format(v, 'YYYY-MM-DD hh:mm:ss')
      this.$emit('on-from-date-range', {
        key: 'endTime',
        value: v
      })
    }
  },
  methods: {
    resetData () {
      this.startvalue = ''
      this.endvalue = ''
    }
  }
}
</script>
<style lang="less" scoped>
.date-range {
  float: left;
  .picker-title{
    margin-right:10px;
  }
}
</style>
