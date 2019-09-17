// pages/outbound/outbound.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorType:1,
    products:[],
    outList:[],
    noMoreItem:{
      name:'xxxxx'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    try {
      var value = wx.getStorageSync('store')
      if (value) {
        // Do something with return value
        this.setData({
          products: value
        })
        console.error(value);
      }
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  checkboxChange: function (e) {
    var indexs = e.detail.value;
    var newItems = [];
    indexs.forEach(e => {
      var index = parseInt(e);
      var newItem = this.data.products[index];
      var copyItem = {
        id: newItem.id,
        name: newItem.name,
        num: 0,
      }
      newItems.push(copyItem);
    })
    this.setData({
      outList: newItems
    });
  },

  setNum: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var oldItem = this.data.outList[index];
    oldItem.num = e.detail.value;
    this.setData({
      outList: this.data.outList,
    })
  },

  inBound: function () {
    if (this.validate() &&  this.validateInventory()) {
      var products = this.data.products;
      this.data.outList.forEach(e => {
        var current = products.find(item => {
          return item.id === e.id;
        });
        current.num = parseInt(e.num) - parseInt(current.num);
      });
      wx.setStorage({
        key: "store",
        data: products
      })
      wx.redirectTo({
        url: '/pages/index/index'
      })
    } else {
      var title = this.data.errorType === 1 ? '物品出库数量未输入' : '物品' + this.data.noMoreItem.name+'输入数值大于库存值';
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
      })
    }
  },

  validate: function () {
    var outList = this.data.outList;
    var result = outList.find(e => {
      return e.num === '' || e.num <= 0;
    });
    if (result) {
      return false;
    } else {
      return true;
    };
  },

  validateInventory:function () {
    var outList = this.data.outList;
    var products = this.data.products;
    var noMoreItem = outList.find(e => {
      var sameItem = products.find(item => {
        return item.id === e.id;
      });
      return e.num > sameItem.num;
    });
    if (noMoreItem) {
      this.setData({
        errorType:2,
        noMoreItem:noMoreItem
      })
      return false;
    } else {
      return true;
    };
  }
})