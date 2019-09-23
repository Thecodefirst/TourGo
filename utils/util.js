import store from "../westore/store";
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// POST
const post = (url, params, callback ) => {
  //POST请求
  wx.request({
    url:'https://wallet.utourlet.com/tourgo/api' + url,
    method: 'POST',
    data: params,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': store.data.loginState ? store.data.token : ''
    },
    success: function(res) {
      callback(res)
    }
  })
}
// 工具函数 => 地狱回调
const promisify = original => {
  return function(opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}

const newArr = (val) => {
  return val.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
}

const newObj = (key, val) => {
  var obj = {};
  return val.reduce(function(item, next) {
      obj[next[key]] ? '' : obj[next[key]] = true && item.push(next);
      return item;
  }, []);
}

const createNewObj = (key, val) => {
  let objStatus = [] //位置记录
  let newObj = [] //对象分类
  for(let a=0;a<val.length;a++) {
    if(!objStatus.includes(val[a][key])){
      objStatus.push(val[a][key])
      newObj.push({ saleName: val[a][key], saleList: [val[a]]})
    }else{
      newObj[objStatus.indexOf(val[a][key])].saleList.push(val[a])
    }
  }
  return newObj
}

const replaceSku = (key, val) => {
  let result
  for(let a=0;a<val.length;a++){
    if(key.toString() == val[a].productSaleValueId.toString()){
        result = val[a]
      }
  }
  return result
}
module.exports = {
  replaceSku: replaceSku,
  createNewObj: createNewObj,
  newObj: newObj,
  newArr: newArr,
  promisify: promisify,
  post: post,
  formatTime: formatTime
}
