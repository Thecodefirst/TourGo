import store from "../../../westore/store";
import create from "../../../westore/create";
import { post } from "../../../utils/util"
create(store, {
  data: {
    off: false,

    indexProvince: '',
    provinceList: [],
    provinceId: '',

    indexCity: '',
    cityList: [],
    cityId: '',

    addressOptions: {
      id: '',
      createDate: '',
      updateDate: null,
      userId: '',
      receiver: '',
      mobile: '',
      provinceId: '',
      province: '',
      cityId: '',
      city: '',
      addressDetail: '',
      postCode: '',
      isDefault: false,
    }
  },
  bindchangeSwitch: function(e) {
    this.setData({ ['addressOptions.isDefault']: e.detail.value })
  },
  bindPickerChange: async function (e) {
    this.setData({ cityList: await this.areaInit(this.data.provinceList[e.detail.value].id, 4), indexProvince: e.detail.value, indexCity: 0 })
  },
  bindPickerChangeCity: function (e) {
    this.setData({ indexCity: e.detail.value })
  },
  getAddArea: async function() {
    this.setData({ cityList: await this.areaInit(247, 4), provinceList: await this.areaInit(7, 3), indexProvince: 0, indexCity: 0 })
  },
  getArea: async function(obj) {
    let proList = await this.areaInit(7, 3),
        cityList = await this.areaInit(obj.provinceId, 4),
        indexProvince = proList.findIndex(function (x) { return x.id==obj.provinceId }),
        indexCity = cityList.findIndex(function (x) { return x.id==obj.cityId })
    this.setData({ provinceList: proList, cityList: cityList, indexProvince: indexProvince, indexCity: indexCity, addressOptions: obj })
  },
  // provinceList
  areaInit: function(parentId, level) {
    return new Promise(resolve => {
      post('/common/area',{ parentId: parentId, level: level },(res) => {
        if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
          resolve(res.data.response)
        }
      })
    })
  },
  addressOptions: async function(id) {
    let _this = this
    post('/user/address/selectEditingAddress',{ id: id },(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        _this.getArea(res.data.response)
      }
    })
  },
  formSubmit: function(e) {
    let obj = e.detail.value, phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/, name = /^[u4E00-u9FA5]+$/, province = this.data.provinceList[this.data.indexProvince], city = this.data.cityList[this.data.indexCity], data
    if(obj.receiver == '' || !name.test(obj.receiver)) {
      wx.showToast({title: '请填写正确的收货人',icon: 'none',duration: 2000})
      return false
    }else if(obj.mobile == '' || !phonetel.test(obj.mobile)) {
      wx.showToast({title: '请填写正确的联系电话',icon: 'none',duration: 2000})
      return false
    }else if(!obj.addressDetail) {
      wx.showToast({title: '请填写详细地址',icon: 'none',duration: 2000})
      return false
    }
    data = {
      receiver: obj.receiver,
      mobile: obj.mobile,
      provinceId: province.id,
      province: province.areaName,
      cityId: city.id,
      city: city.areaName,
      addressDetail: obj.addressDetail,
      isDefault: this.data.addressOptions.isDefault
    }
    if(this.data.addressOptions.id) { this.addressUpdate(data) }
    else{ this.addressAdd(data) }
  },
  addressAdd: function(val) {
    console.log(val)
    post('/user/address/insert', val ,(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        console.log(res)
        wx.showToast({title: '新增地址成功',icon: 'success',duration: 2000})
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  addressUpdate: function(val) {
    val['id'] = this.data.addressOptions.id
    console.log(val)
    post('/user/address/update', val ,(res) => {
      if(res.data.code == "SUCCESS" && res.data.resultCode == "SUCCESS") {
        console.log(res)
        wx.showToast({title: '修改地址成功',icon: 'success',duration: 2000})
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  onLoad: function (options) {
    if(options.addressId) { this.addressOptions(options.addressId); this.setData({ ['addressOptions.id']: options.addressId }) }
    else{ this.getAddArea() }
  },
})