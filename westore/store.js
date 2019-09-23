import { promisify } from '../utils/util'
export default {
    data: {
        goodsid: '',
        addressId: '',
        productList:[],
        statusBar: {
          bottom: '',
          height: '',
          left: '',
          right: '',
          top: '',
          width: '',
        },
        loginState: false,//全局登录状态
        token: function() {
            return this.loginState ? wx.getStorageSync('token') : 'adus'
        },
    },
    productListFun: function(proList, addressId) {
        this.data.productList = []
        for(let a=0;a<proList.length;a++){
            this.data.productList.push({
                productBuyNum: proList[a].num,
                productId: proList[a].productId,
                skuId: proList[a].id,
            })
        }
        this.update({addressId: addressId})
    },
    // 适配
    iOS_Android: function () {
      let res = wx.getMenuButtonBoundingClientRect()
      console.log(res)
      this.update({ statusBar: res})
    },
    // 状态检查 => 主动调用
    wx_checkSession: function() {
        let _this = this;
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.checkSession({
                        success: function () {
                            console.log('3rd_session有效')
                            if(wx.getStorageSync('token')){_this.update({ loginState: true })}
                            else{_this.update({ loginState: false })}
                        },
                        fail: function () {
                            console.log('3rd_session已过期')
                            _this.update({ loginState: false })
                        }
                    })
                }
            }
        }) 
    }
  }