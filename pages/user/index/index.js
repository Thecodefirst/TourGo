import store from "../../../westore/store";
import create from "../../../westore/create";
create(store, {
  data: {

  },
  goSettings: function() {
    if (this.store.data.loginState){wx.navigateTo({url:"../../settings/settings"});}
    else{wx.navigateTo({url:"../../login/login"});}
  },
  goOrders: function(e) {
    if (this.store.data.loginState){wx.navigateTo({url:"../myorders/myorders?activeTab=" + e.currentTarget.dataset['index']});}
    else{wx.navigateTo({url:"../../login/login"});}
  },
  onLoad: function (options) {
    
  }
})