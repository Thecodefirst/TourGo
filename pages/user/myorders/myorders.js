import store from "../../../westore/store";
import create from "../../../westore/create";
import { post } from "../../../utils/util";
create(store, {
  data: {
    cardViewContent:[

    ],
    bottomTab:['全部订单','待付款','待发货','待收货','交易完成','交易关闭'],
    activeTab: 0,
    todayList: [],
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