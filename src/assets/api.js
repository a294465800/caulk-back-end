import axios from 'axios'
import qs from 'qs'
import jsonP from 'jsonp'
import {
  MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const TXWebService = 'http://apis.map.qq.com/ws/district/v1/'
const TXKey = 'FF2BZ-H34WP-GQPDC-VFKIS-P7DDH-BCFNG'
// const host = 'http://119.23.255.177:8090/'
const host = 'http://192.168.3.22:9000/'
// const host = 'http://xcx.gdmeika.com/'

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

  // host: 'http://xcx.gdmeika.com/',
  host: 'http://192.168.3.22:9000/',
  // host: 'http://119.23.255.177:8090/',

  /**
   * 出错提示函数
   * @param {object} error 错误对象 {return_code, return_msg}
   */
  APIError(error) {
    MessageBox.alert(error ? error.data.msg : error, '出错啦', {
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
   * 删除商品单张图片
   * @param {string} id 
   * @param {function} cb 回调
   */
  deleteCommodityImg(id, cb) {
    axios.get(`${host}del/commodity/picture/${id}`)
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
    axios.post(`${host}standards`, data)
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
   * 删除单个规格的单个属性
   * @param {string} id 
   * @param {function} cb 
   */
  deleteStandardAttr(id, cb) {
    axios.get(`${host}del/attr/${id}`)
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
   * 编辑单个规格
   * @param {string} id 
   * @param {object} data {title, attrs}
   * @param {function} cb 回调
   */
  editStandardSingle(id, data, cb) {
    axios.post(`${host}standard/${id}`, data)
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
  getProducts(id, data, cb) {
    axios.get(`${host}products/${id}`, {
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
   * 添加新库存 第三步
   * @param {object} data {(id), commodity_id, feature, price, stock}
   * @param {*} cb 
   */
  postProduct(data, cb) {
    axios.post(`${host}product`, data)
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
  },

  /**
   * 获取所有订单
   * @param {object} data {(number),(state),(page),(limit)}
   * @param {function} cb 回调
   */
  getOrders(data, cb) {
    axios.get(`${host}orders`, {
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
   * 获取单条订单信息
   * @param {string} id 
   * @param {function} cb 回调
   */
  getOrder(id, cb) {
    axios.get(`${host}order/${id}`)
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
   * 获取产品图片
   * @param {string} id 
   * @param {function} cb 
   */
  getProductImages(id, cb) {
    axios.get(`${host}commodity/pictures/${id}`)
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
   * 删除产品图片
   * @param {string} id 
   * @param {function} cb 
   */
  deleteProductImages(id, cb) {
    axios.get(`${host}del/commodity/picture/${id}`)
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
   * 新增商品图片
   * @param {object} data {commodity_id, base_url, thumb_url}
   * @param {function} cb 
   */
  postProductImage(data, cb) {
    axios.post(`${host}commodity/picture`, data)
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
   * 获取广告列表
   * @param {object} data {type}
   * @param {function} cb
   */
  getAdverts(data, cb) {
    axios.get(`${host}adverts`, {
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
   * 提交广告
   * @param {object} data {type, thumb_url, url, param}
   * @param {function} cb 
   */
  postAdvert(data, cb) {
    axios.post(`${host}advert`, data)
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
   * 删除广告图片
   * @param {string} id 
   * @param {function} cb 
   */
  deleteAdvert(id, cb) {
    axios.get(`${host}del/advert/${id}`)
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
   * 获取公司信息
   * @param {function} cb 
   */
  getCompanies(cb) {
    axios.get(`${host}articles`)
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
   * 提交公司信息
   * @param {object} data {content, type}
   * @param {function} cb 
   */
  postCompany(data, cb) {
    axios.post(`${host}article`, data)
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
   * 获取师傅列表
   * @param {object} data {state, (limit), (page)}
   * @param {function} cb 回调
   */
  getApplies(data, cb) {
    axios.get(`${host}applies`, {
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
   * 获取师傅列表
   * @param {object} data {state}
   * @param {function} cb 回调
   */
  postApply(id, data, cb) {
    axios.get(`${host}review/apply/${id}`, {
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
   * 获取师傅列表
   * @param {object} data {page, (limit), name, id_card, province, start, end, search}
   * @param {function} cb 回调
   */
  getWorkers(data, cb) {
    axios.get(`${host}workers`, {
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
   * 停用、启用师傅
   * @param {string} id 
   * @param {function} cb 
   */
  changeWorker(id, cb) {
    axios.get(`${host}modify/worker/${id}`)
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
   * 假如省份的日期没有更新，就直接拿 localStorage 的数据
   * @param {*行政区 ID} id 
   * @param {* jsonP 回调} callback 
   */
  getDistrict(callback) {
    const localShengs = localStorage.infoShengs
    if (localShengs) {
      typeof callback === 'function' && callback(null, JSON.parse(localShengs))
    }
    jsonP(`${TXWebService}getchildren?key=${TXKey}&output=jsonp`, null, (err, data) => {
      localStorage.infoShengs = JSON.stringify(data)
      typeof callback === 'function' && callback(err, data)
    })
  },

}
