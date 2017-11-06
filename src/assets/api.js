import axios from 'axios'
import qs from 'qs'
import {
  MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const host = 'http://119.23.255.177:8090/'

/*
  配置 axios
*/
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
  //在发送 post 请求请设置一下数据格式
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  console.log('错误的传参！')
  return Promise.reject(error)
})


export default {

  /**
   * 出错提示函数
   * @param {object} error 错误对象 {return_code, return_msg}
   */
  APIError(error) {
    console.log(error)
    MessageBox.alert(error ? error.data.return_msg : error, '出错啦', {
      confirmButtonText: '确定',
    })
  },

  /**
   * 登录 api
   * @param {object} data 用户的登录信息 {username, password}
   * @param {function} cb 回调
   */
  login(data, cb) {
    axios.post(`${host}login`, data)
      .then(res => {
        if ('200' === res.data.code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  getReservations(data, cb){
    axios.get(`${host}reserves`, {
      params: data
    })
    .then(res => {
      if ('200' === res.data.code) {
        typeof cb === 'function' && cb(res)
      } else {
        this.APIError(res)
      }
    }).catch(error => {
      this.APIError(error.response)
    })
  }

}
