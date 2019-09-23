import store from "../../westore/store";
import create from "../../westore/create";
create(store, {
  data: {

  },
  addressManage: function() {
    if (this.store.data.loginState){wx.navigateTo({url:"../address/addresslist/addresslist"});}
    else{wx.navigateTo({url:"../login/login"});}
  },
  // 退出登录
  logoutAccount: function() {
    let _this = this
    wx.showModal({
      title: '退出账号',
      content: '确认退出当前账号吗？',
      success (res) {
        if (res.confirm) {
          console.log('确定')
          wx.clearStorageSync()
          _this.update({ loginState: true })
          wx.navigateBack({
            delta: 1
          })
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },
  onLoad: function (options) {

  }
})