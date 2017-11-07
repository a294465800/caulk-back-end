import axios from 'axios'
import qs from 'qs'
import {
  MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// const host = 'http://119.23.255.177:8090/'
const host = 'http://192.168.3.22:9000/'

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

  /**
   * 获取预约列表
   * @param {object} data 
   * @param {function} cb 
   */
  getReservations(data, cb) {
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
  },

  /**
   * 添加商品信息 第一步
   * @param {object} data {title, description, content}
   * @param {function} cb 
   */
  postCommodityInfo(data, cb) {
    axios.post(`${host}info`, data)
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

  /**
   * 获取商品列表 第一步列表
   * @param {} data {(page), (limit)}
   * @param {function} cb 
   */
  getCommodityInfo(data, cb) {
    axios.get(`${host}infos`, {
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
  },

  /**
   * 删除商品 第一步
   * @param {string} id 
   * @param {function} cb  回调
   */
  deleteCommodityInfo(id, cb) {
    axios.get(`${host}del/info/${id}`)
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

  /**
   * 新增商品规格
   * @param {object} data {title, attrs, commodity_id}
   * @param {function} cb 
   */
  postStandards(data, cb) {
    axios.post(`${host}standard`, data)
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

  /**
   * 获取对应商品规格
   * @param {string} id commodity_id
   * @param {function} cb 回调
   */
  getStandards(id, cb) {
    axios.get(`${host}standards/${id}`)
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

  /**
   * 删除对应商品规格
   * @param {string} id id
   * @param {function} cb 回调
   */
  deleteStandards(id, cb) {
    axios.get(`${host}del/standard/${id}`)
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

  /**
   * 获取商品列表 第三步
   * @param {string} id commodity_id
   * @param {function} cb 回调
   */
  getProducts(id, cb) {
    axios.get(`${host}products/${id}`)
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

  /**
   * 添加新库存 第三步
   * @param {object} data {(id), commodity_id, feature, price, stock}
   * @param {*} cb 
   */
  postProduct(data, cb) {
    axios.post(`${host}standard`, data)
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

  /**
   * 删除库存商品 第三步
   * @param {string} id 
   * @param {function} cb 
   */
  deleteProduct(id, cb) {
    axios.get(`${host}del/product/${id}`)
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
