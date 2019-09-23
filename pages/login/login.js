import { post } from '../../utils/util.js'
import store from "../../westore/store";
import create from "../../westore/create";

create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    // westore
    loginState: null,
  },
  bindGetUserInfo(res) {
    let _this = this
    wx.showLoading({
      title: '加载中',
    }) 
    let userDetial = res.detail
    console.log(userDetial)
    if (res.detail.userInfo) {
      wx.login({
        success: (result) => {
          post('/wx/user/getUserInfo',{
            "code": result.code,
            "encryptedData": userDetial.encryptedData,
            "iv": userDetial.iv,
            "appId": 'wxa2f393e740ea0b5d',
          },(res) => {
            let result = res.data
            if(result.code == "SUCCESS" && result.resultCode == "SUCCESS"){
              wx.setStorageSync('token', result.response.token)
              wx.setStorageSync('userInfo', result.response)
              _this.update({ loginState: true })
              wx.hideLoading()
              wx.navigateBack({
                delta: 1
              })
            }
          })
        },
        fail: () => {},
      });
    } else {
      console.log("点击了拒绝授权");
      wx.navigateBack({
        delta: 1
      })
    }
  },
})