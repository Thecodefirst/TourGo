import store from "../../westore/store";
import create from "../../westore/create";
import { post } from '../../utils/util';
create(store, {
  data: {
    orderObject: '',
    address: '',
    orderNote: ''
  },
  // init
  orderInit: function() {
    let _this = this, obj
    console.log({ productList: this.store.data.productList, addressId: this.store.data.addressId })
    post('/order/preOrder', { productList: JSON.stringify(this.store.data.productList), addressId: this.store.data.addressId },(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        obj = res.data.response
        console.log(obj)
        _this.setData({ orderObject: obj, address: obj.receiveAddress })
      }
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      orderNote: e.detail.value
    })
  },
  // 
  submitOrder: function() {
    let _this = this, obj, data, a = this.data.orderObject, b = this.store.data.productList
    data = {
      totalAmount: a.productAmount,
      payAmount: a.productAmount,
      sourceType: 1,
      addressId: a.receiveAddress.id,
      note: this.data.orderNote,
      integration: a.preIntegration,
      productId: b[0].productId,
      skuId: b[0].skuId,
      productImage: a.productList[0].list[0].productImage,
      productBuyNum: b[0].productBuyNum,
    }
    console.log(data)
    post('/wx/pay/unifiedOrder', data, (res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        obj = res.data.response
        console.log(obj)
        wx.requestPayment({
          'timeStamp': obj.timeStamp,
          'nonceStr': obj.nonceStr,
          'package': obj.package,
          'signType': 'MD5',
          'paySign': obj.paySign,
          'success':function(res){
            console.log(res)
          },
          'fail':function(res){
            console.log(res)
          }
        })
      }
    })
  },
  // 确认地址
  sureAddress: function() {
    wx.navigateTo({
      url:"../address/addresslist/addresslist"
    });
  },
  onLoad: function (options) {
    console.log(this.store.data.productList)
  },
  onShow: function() {
    this.orderInit()
  },
})