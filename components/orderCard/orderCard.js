import create from '../../westore/create'

create({
  pure : true,

  properties: {
    dataList: {
      type: Object,
      value: {}
    }
  },
  data: {
    
  },

  methods: {
    // 商品信息
    navigatorGoodsInfo: function(e) {
      console.log(e.currentTarget.dataset['item'])
      wx.navigateTo({
        url:"../goodsinfo/goodsinfo?goodsId=1"
      });
    },
    orderState: function() {
      console.log(this.data.dataList)
      let a
      switch (this.properties.dataList.state) {
        case 1:
          a = "待付款";
             break;
        case 2:
          a = "待发货";
             break;
        case 3:
          a = "待收货";
             break;
        case 4:
          a = "交易成功";
             break;
        case 5:
          a = "交易关闭";
             break;
      }
      return a
    }
  }
})