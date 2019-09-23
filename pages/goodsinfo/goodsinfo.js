import store from "../../westore/store";
import create from "../../westore/create";
import { post, replaceSku, createNewObj, newObj, newArr  } from '../../utils/util';
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    productId: '',
    productData:'',//商品详情
    // swiper
    imgUrls: [
      'https://img.gojoy.cn/gmall/images/20190704/FtKGHUoFzeGtkznhV2DOoXg2pLtH.jpg',
      'https://img.gojoy.cn/gmall/images/20190704/Fn36cGq69WmdkY7d12BtsPHSGZIs.jpg',
      'https://img.gojoy.cn/gmall/images/20190704/FnMo2q-FOVUAk8t5hJqiH6y6xRX6.jpg',
      'https://img.gojoy.cn/gmall/images/20190704/Ft_3yOvWLLgHrMEDTMnDrMsNVnLQ.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    backTop: false,

    clauseDialog: false,
    skuDialog: false,
    addressDialog: false,

    goodsNumber: 1,
    bottomBar: true,

    // weStore
    loginState: null,

    // sku-dialog
    skuSize: '',
    skuSizeChild: [],
    skuList: '',
    skuSelected: '',
    skuAddBuy: true,

    // addressList
    defaultAddressObj: '',
    addressList: '',
    addressIndex: '',
    addressText: '选择地址',
  },
  // skuSizeClick
  skuSizeClick: function(e) {
    let a = e.currentTarget, obj = 'skuSizeChild['+ a.dataset['index'] +']', objNew = this.data.skuSizeChild
    objNew[a.dataset['index']] = a.dataset['itemchild'].saleValueId
    this.setData({ [obj]: a.dataset['itemchild'].saleValueId, skuSelected: replaceSku(objNew, this.data.skuList) })
  },
  // 
  productOptions: function(productId) {
    let _this = this
    post('/product/detail', { productId: productId },(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        let obj = [], a = res.data.response, introduction = a.product.introduction.replace(/\<img/gi, '<img style="width:100%;height:auto" '), createNewObjKey = createNewObj('saleName' ,newObj('saleValueId', newArr(a.skuSale)))
        a.product.introduction = introduction
        for(let a=0;a<createNewObjKey.length;a++) {
          obj.push(createNewObjKey[a].saleList[0].saleValueId)
        }
        console.log(a)
        _this.setData({ productData: a, skuSize: createNewObjKey, skuSizeChild: obj, skuList: a.skuList, skuSelected: replaceSku(obj, a.skuList), ['skuSelected.num']: this.data.goodsNumber });
      }
    })
  },
  // 立即购买
  buyNow: function() {
    wx.navigateTo({
      url:"../orderconfirm/orderconfirm"
    });
  },
  // sku-数量选择器
  bindKeyInput: function(e) {
    this.setData({
      goodsNumber: e.detail.value
    })
  },
  bindKeyBtn: function(e) {
    if(e.currentTarget.dataset['index'] == '0') {
      if(this.data.goodsNumber > 0) {
        this.setData({ goodsNumber: this.data.goodsNumber-1 })
      }
    }else{
        this.setData({ goodsNumber: this.data.goodsNumber+1 })
    }
  },
  // 
  addressList: function() {
    let _this = this
    post('/user/address/getList',{},(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        _this.setData({ addressList: res.data.response })
      }
    })
  },
  // 
  defaultAddress: function() {
    let _this = this, obj
    post('/user/address/getDefault',{},(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        obj = res.data.response
        if(obj) { _this.setData({ defaultAddressObj: obj, addressText: obj.province + obj.city + obj.addressDetail }) }
        
      }
    })
  },
  chooseAddress: function(e) {
    let a = e.currentTarget.dataset, addressIndex = a['index'], obj = a['item']
    this.setData({ addressIndex: addressIndex, addressText: obj.province + obj.city + obj.addressDetail, addressDialog: false, defaultAddressObj: obj })
  },
  // 监听滚动条
  onPageScroll:function(e){
    if(e.scrollTop > 500){ this.setData({ backTop: true }) }
    else { this.setData({ backTop: false }) }
  },
  // addressDialog
  openAddressDialog: function() {
    if (this.store.data.loginState){
      this.setData({ addressDialog: true })
    }
  },
  closeAddressDialog: function () {
    this.setData({addressDialog: false, ['skuSelected.num']: this.data.goodsNumber })
  },
  otherAddress: function () {
    wx.navigateTo({
      url:"../address/addresslist/addresslist"
    })
  },
  // clause-dialog
  openClauseDialog: function () {
    this.setData({
      clauseDialog: true
    })
  },
  closeClauseDialog: function () {
    this.setData({
      clauseDialog: false
    })
  },
  // sku-dialog
  openSkuDialog: function () {
    this.setData({skuDialog: true, skuAddBuy: true})
  },
  openAddSkuDialog: function () {
    this.setData({skuDialog: true, skuAddBuy: false})
  },
  closeSkuDialog: function() {
    this.setData({skuDialog: false })
  },
  sureSkuDialog: function () {
    let a = this.data, b
    if(a.addressIndex){ b = a.addressList[a.addressIndex].id }
    else { b = a.defaultAddressObj.id }
    this.setData({skuDialog: false,['skuSelected.num']: a.goodsNumber}, () => {
      this.store.productListFun([this.data.skuSelected], b)
      wx.navigateTo({
        url:"../orderconfirm/orderconfirm?skuid=" + a.skuSelected.id
      })
    })
  },
  sureAddSkuDialog: function () {
    this.setData({skuDialog: false,['skuSelected.num']: this.data.goodsNumber}, () => {
      console.log(this.data.skuSelected)
      console.log(this.data.skuAddBuy)
    })
  },
  // 返回上一页
  goShopBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  shareProduct: function() {
    let _this = this, obj
    post('/wx/user/share',{ url: 'pages/goodsinfo/goodsinfo', productId: _this.data.productId },(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        obj = res.data.response
        return {
          title: obj.productInfo.productName,
          path: 'pages/goodsinfo/goodsinfo?productId=' + _this.data.productId,
          imgUrl: obj.productInfo.productImage,
          success: function(res) {
            if(res.errMsg == 'shareAppMessage:ok'){

            }
          },
          fail: function(err) {
            if(res.errMsg == 'shareAppMessage:fail cancel'){
  　　　　　　　　
  　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
  　　　　　　　　
  　　　　　　}
          }
        }
      }
    })
  },
  //
  routerLogin: function() {
    wx.navigateTo({ url:"../login/login"})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({ productId: e.productId })
    this.productOptions(e.productId)
  },
  onShow: function() {
    this.store.wx_checkSession()
    if(this.store.data.loginState) { this.addressList(); this.defaultAddress() }
  },
  onShareAppMessage: function(e) {
    let _this = this, obj
  }
})