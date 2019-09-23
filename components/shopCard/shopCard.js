import create from '../../westore/create'

create({
  pure : true,

  properties: {
    dataList: {
      type: Object,
      value: {
        imageUrl: '',
        productName: '',
        price: '',
        marketPrice: '',
        productId: ''
      }
    }
  },
  data: { },

  methods: {
    navigatorGoodsInfo: function(e) {
      this.triggerEvent('increment', { productId: e.currentTarget.dataset['item'].productId })
    },
  }
})