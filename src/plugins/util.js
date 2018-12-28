// 英文数字格式
/**
 *
 * @param {number/string} num 数字字符串或者数字之外的类型返回0，其他转译为英文数字格式
 */
export function getEnglishNumerals (nums) {
  let num = (nums || 0).toString()

  let decimalIndex = num.indexOf('.')
  let result = ''
  if (decimalIndex > -1) {
    result = num.slice(decimalIndex, num.length)
    num = num.slice(0, decimalIndex)
  }

  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) { result = num + result }
  return result
}

/**
 *
 * @param {tTimestamp} sendDate 开始的时间，获取服务器当前时间实时展示
 */
export function getNowDate (sendDate) {
  let date = sendDate ? new Date(sendDate) : new Date()
  const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let split = '/'

  let year = date.getFullYear()
  let month = add0(date.getMonth() + 1)
  let thisDate = add0(date.getDate())
  let day = weeks[date.getDay()]
  let hour = add0(date.getHours())
  let minute = add0(date.getMinutes())
  let second = add0(date.getSeconds())

  return year + split + month + split + thisDate + '   ' + '  ' + day + '  ' + '  ' + hour + ':' + minute + ':' + second
}

function add0 (num) {
  return num < 10 ? ('0' + num) : num
}

// 获取服务器时间
export async function getSystemTime (_this) {
  let $this = _this || this
  try {
    if ($this) {
      let data = await $this.$ajax({
        method: 'get'
        // url: '/center/systemTime'
      })
      return data.data
    } else {
      console.error('请给方法提供this，传入或者绑定')
      return false
    }
  } catch (err) {

  }
}

// 创建uuid
let seed = 0
export function getUuid () {
  return `uuid_${new Date().getTime()}_${++seed}`
}

/**
 *
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export function _random (min = 0, max) { // [min/0,max]之间的随机整数
  if (typeof (max) === 'undefined') {
    max = min
    min = 0
  }
  return Math.floor(Math.random() * (max - min + 1) + min)
}
