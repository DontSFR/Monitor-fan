
/**
 * 简单字典
 */
let boolType = [
  {
    key: 'Y',
    value: '是'
  },
  {
    key: 'N',
    value: '否'
  }
]

let jobStatus = [
  {
    key: 'Executing',
    value: '执行中'
  },
  {
    key: 'UnStart',
    value: '待启动'
  },
  {
    key: 'UnExecute',
    value: '待执行'
  }
]

let register = [
  {
    key: 'Register',
    value: '注册'
  },
  {
    key: 'NotRegister',
    value: '非注册'
  }
]

let alarmType = [
  {
    key: 'always',
    value: '始终报警'
  },
  {
    key: 'once_day',
    value: '一天报警一次'
  },
  {
    key: 'stopped_times',
    value: '报警N次后即停止'
  },
  {
    key: 'stopped_times_day',
    value: '当天报警N次后即停止'
  }
]

let jobAlarmSituation = [
  {
    key: 'JobFail',
    value: '任务失败后预警'
  },
  {
    key: 'JobTimeOut',
    value: '任务执行时间超过时间后预警'
  },
  {
    key: 'JobTriggerFail',
    value: '任务超过多少次触发预警'
  }
]

let alarmWay = [
  {
    key: 'SMS',
    value: '手机短信'
  },
  {
    key: 'email',
    value: '邮箱'
  }
]

let dict = {
  boolType,
  jobStatus,
  register,
  alarmType,
  jobAlarmSituation,
  alarmWay
}

/**
 *根据code查询
 返回所有的字段
 * @param {*} code
 */
export function getListByCode (code) {
  return new Promise(function (resolve, reject) {
    if (!localStorage.getItem(code)) {
      window.ajax({
        method: 'post',
        // url: '/dictionary/queryChildrenByParentCode',
        data: {
          code: code
        }
      }).then(result => {
        localStorage.setItem(code, JSON.stringify(result.data))
        resolve(result.data)
      }).catch(error => {
        reject(error)
      })
    } else {
      resolve(JSON.parse(localStorage.getItem(code)))
    }
  })
}
/**
 * 简单版只返回name和code
 */
export function getLIstByCodeSimple (code) {
  return new Promise(function (resolve, reject) {
    getListByCode(code).then(data => {
      let array = data.map(t => {
        return {
          name: t.name,
          code: t.code
        }
      })
      resolve(array)
    })
  })
}

export function getValueByName (dic, key) {
  if (dict[dic]) {
    let data = dict[dic].filter((t) => {
      return t.key === key
    })
    if (data.length === 0) {
      console.error('不存在key:' + key)
    } else {
      return data[0].value
    }
  } else {
    console.error('不存在dic:' + dic)
  }
}
export function getNameByValue (dic, value) {
  if (dict[dic]) {
    let data = dict[dic].filter((t) => {
      return t.value === value
    })
    if (data.length === 0) {
      console.error('不存在value:' + value)
    } else {
      return data[0].key
    }
  } else {
    console.error('不存在dic:' + dic)
  }
}

export function getStatusList (dic) {
  if (dict[dic]) {
    return dict[dic]
  } else {
    console.error('不存在dic:' + dic)
  }
}
