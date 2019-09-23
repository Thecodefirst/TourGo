import create from '../../westore/create'

create({
  pure : true,
  
  properties: {
    backTop: { // 属性名
      type: Boolean,
      value: false
    },
  },
  data: { },
  methods: {
    //回到顶部
    goTop: function (e) {  // 一键回到顶部
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
  }
})