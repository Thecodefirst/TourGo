import store from "../../../westore/store";
import create from "../../../westore/create";
import { post } from "../../../utils/util"
create(store, {
  data: {
    addressList: ''
  },
  radioChange: function(e) {
    console.log(e)
    let _this = this
    post('/user/address/updateDefaultReceiveAddress',{ id: e.detail.value },(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        wx.showToast({title: '设置成功',icon: 'success',duration: 2000})
      }
    })
  },
  addressAdd: function(e) {
    console.log(e.currentTarget.dataset['id'])
    if(e.currentTarget.dataset['id']) {
      wx.navigateTo({
        url:"../addressoptions/addressoptions?addressId=" + e.currentTarget.dataset['id']
      })
    }else{
      wx.navigateTo({
        url:"../addressoptions/addressoptions"
      })
    }
  },
  // 地址列表
  addressList: function() {
    let _this = this
    post('/user/address/getList',{},(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        _this.setData({ addressList: res.data.response })
      }
    })
  },
  deleteAddress: function(e) {
    let _this = this;
    console.log(e)
    wx.showModal({
      title: '删除地址',
      content: '确认删除地址吗？',
      success (res) {
        if (res.confirm) {
          console.log('确定')
          post('/user/address/delete',{ id: e.currentTarget.dataset['id'] },(res) => {
            if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
              wx.showToast({title: '设置成功',icon: 'success',duration: 2000})
              _this.addressList()
            }
          })
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },
  orderAddress: function(e) {
    let pages = getCurrentPages(), prevpage = pages[pages.length - 2], _this = this
    if(prevpage.route == 'pages/orderconfirm/orderconfirm'){
      wx.showModal({
        title: '选择地址',
        content: '确定选择这条地址么？',
        success (res) {
          if (res.confirm) {
            _this.update({ addressId: e.currentTarget.dataset['id'] }).then(diff => {
              wx.navigateBack({
                url: '../../orderconfirm/orderconfirm'
              })
            })
          } else if (res.cancel) {
            
          }
        }
      })
    }
  },
  onLoad: function (options) {
  },
  onShow: function() {
    this.addressList()
  }
})