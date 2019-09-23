import store from "../../../westore/store";
import create from "../../../westore/create";
create(store, {
  data: {
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
  onLoad: function (options) {
    
  }
})