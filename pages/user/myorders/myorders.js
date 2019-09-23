import store from "../../../westore/store";
import create from "../../../westore/create";
import { post } from "../../../utils/util";
create(store, {
  data: {
    cardViewContent:[

    ],
    bottomTab:['全部订单','待付款','待发货','待收货','交易完成','交易关闭'],
    activeTab: 0,
    todayList: [
      {
        image: "https://img.gojoy.cn/gmall/images/20190815/FpOA0alyrZ2aARAeCICrr5KhCLip.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "胖妹妹新款秋装套头小卫衣女大码女装200斤",
        price: "77.00",
        priceNew: "40.00"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190610/FofKNNQolYj3wwgyE2NEBiMAi75L.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "羚跑男士手包钱包新款时尚潮流真皮大容量软皮手抓包信封包手拿包",
        price: "528.00",
        priceNew: "238.00"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190725/FhHGAII-wTKUuWguPn5p-cx8Dgss.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "【2件装】优棉心语日本安心四代一片式睡眠运动文胸 无痕无钢圈V领瑜伽内衣",
        price: "128.00",
        priceNew: "49.90"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190815/FpOA0alyrZ2aARAeCICrr5KhCLip.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "胖妹妹新款秋装套头小卫衣女大码女装200斤",
        price: "77.00",
        priceNew: "40.00"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190610/FofKNNQolYj3wwgyE2NEBiMAi75L.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "羚跑男士手包钱包新款时尚潮流真皮大容量软皮手抓包信封包手拿包",
        price: "528.00",
        priceNew: "238.00"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190725/FhHGAII-wTKUuWguPn5p-cx8Dgss.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "【2件装】优棉心语日本安心四代一片式睡眠运动文胸 无痕无钢圈V领瑜伽内衣",
        price: "128.00",
        priceNew: "49.90"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190815/FpOA0alyrZ2aARAeCICrr5KhCLip.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "胖妹妹新款秋装套头小卫衣女大码女装200斤",
        price: "77.00",
        priceNew: "40.00"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190610/FofKNNQolYj3wwgyE2NEBiMAi75L.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "羚跑男士手包钱包新款时尚潮流真皮大容量软皮手抓包信封包手拿包",
        price: "528.00",
        priceNew: "238.00"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190725/FhHGAII-wTKUuWguPn5p-cx8Dgss.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "【2件装】优棉心语日本安心四代一片式睡眠运动文胸 无痕无钢圈V领瑜伽内衣",
        price: "128.00",
        priceNew: "49.90"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190815/FpOA0alyrZ2aARAeCICrr5KhCLip.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "胖妹妹新款秋装套头小卫衣女大码女装200斤",
        price: "77.00",
        priceNew: "40.00"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190610/FofKNNQolYj3wwgyE2NEBiMAi75L.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "羚跑男士手包钱包新款时尚潮流真皮大容量软皮手抓包信封包手拿包",
        price: "528.00",
        priceNew: "238.00"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190725/FhHGAII-wTKUuWguPn5p-cx8Dgss.jpg?x-oss-process=image/resize,w_360,y_360",
        name: "【2件装】优棉心语日本安心四代一片式睡眠运动文胸 无痕无钢圈V领瑜伽内衣",
        price: "128.00",
        priceNew: "49.90"
      },
    ],
  },
// 商品信息
navigatorGoodsInfo: function(e) {
  wx.navigateTo({
    url:"../../goodsinfo/goodsinfo?goodsId=" + e.detail.goodsId
  });
},
//预览图片，暂时没用
 previewImg:function(e){
  wx.previewImage({
    current:this.data.qrcodeImg,
    urls: this.data.qrcodeImg
  })
},
//点击选项卡Tab操作
rcbBottomTab:function(e){
  console.log(e)
  this.setData({
    activeTab:e.target.dataset.index
  })
  //console.log(e)
  //console.log(this.data.activeTab)
},
//滑动屏幕操作
 swiperChange: function(e){
  let activeTabIndex = e.detail.current
  this.setData({ activeTab: activeTabIndex }, () => {
    this.init(activeTabIndex)
  })
  },
  init: function(val) {
    let _this = this
    post('/order/getByState',{ state: val },(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") { _this.setData({ todayList: res.data.response }) }
    })
  },
  onLoad: function (options) {
    console.log(options)
    this.init(this.data.activeTab)
  }
})