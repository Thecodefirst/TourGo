//index.js
//获取应用实例
import store from "../../westore/store";
import create from "../../westore/create";
import { post, promisify } from "../../utils/util";
const app = getApp()
create(store, {
  data: {
    // 适配
    statusBarHeight: store.data.statusBarHeight,
    // 搜索
    inputVal: '',
    userInfo: {},
    hasUserInfo: false,
    tabsList: ['精选','食品','美妆','母婴','家具','数码','服饰','户外'],
    tabsIndex: 0,
    btnsList: [
      {
        image: "https://img.gojoy.cn/gmall/images/20190517/Fo3MtoXmlT8PEn6yYW-JGR0UenOc.png",
        name: "新品上架"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190504/Fhu91jVx1rhryDBVjIV_3mbTZ-aP.png",
        name: "热卖推荐"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190504/FnQAFdAwVFYHcChO5cdr2XVkcN88.png",
        name: "海外直销"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190504/FkM_1RD-mJc1tRTh8HYvs9xciWY6.png",
        name: "工厂好货"
      },
      {
        image: "https://img.gojoy.cn/gmall/images/20190504/FvtOQY4mtVyqZodaXa5yOEfxMEwz.png",
        name: "新手指南"
      },
    ],
    // 商品list
    todayList: [],
    todayRes: '',
    pageNum: 0,
    pageSize: 10,
    loadingMore: false,
    // banner
    imgUrls: '',
    locations: 1,

    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    backTop: false,
    lazyLoad: true,
    //
  },
  onLoad: function () {
    this.store.iOS_Android()
    this.store.wx_checkSession()
    this.bannerList(this.data.locations)
    this.productList(this.data.pageNum, this.data.pageSize)
  },
  // productList
  productList: function(pageNum, pageSize) {
    let _this = this
    post('/product/list',{ pageNum: pageNum, pageSize: pageSize },(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") { _this.setData({ todayList: _this.data.todayList.concat(res.data.response.list), todayRes: _this.data.response, loadingMore: false }) }
    })
  },
  // productList
  bannerList: function(locations) {
    let _this = this
    post('/scroll/pictures/list',{ locations: locations },(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") { _this.setData({ imgUrls: res.data.response }) }
    })
  },
  // 切换tabs
  tabsClick: function(e) {
    this.setData({
      tabsIndex: e.currentTarget.dataset['index']
    })
  },
  // 商品信息
  navigatorGoodsInfo: function(e) {
    this.update({ goodsid: e.detail.productId }).then(diff => {
      wx.navigateTo({
        url:"../goodsinfo/goodsinfo?productId=" + e.detail.productId
      });
    })
  },
   //下拉刷新
  onPullDownRefresh: function(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function(){
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
  },
  // 上拉加载
  onReachBottom: function () {
    // 显示加载图标
    this.setData({ loadingMore: true, pageNum: this.data.pageNum + 1 })
    this.productList(this.data.pageNum, this.data.pageSize)
  },
  // 监听滚动条
  onPageScroll:function(e){
    if(e.scrollTop > 500){ this.setData({ backTop: true }) }
    else { this.setData({ backTop: false }) }
  },
})
