// pages/history/history.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[],
    products:[],
    originHistory:[]
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      var value = wx.getStorageSync('history');
      var products = wx.getStorageSync('store');
      if (value) {
        // Do something with return value
         value.forEach(item => {
           item.date = util.formatTimeDate(item.date, 'Y-M-D h:m:s')
        })
        this.setData({
          history: value,
          originHistory:value,
          products: products
        })
      }
    } catch (e) {
      // Do something when catch error
    }
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

  checkboxChange:function(e){
    var indexs = e.detail.value;
    var newItems = [];
    if(indexs.length > 0 ){
      indexs.forEach(item => {
        var index = parseInt(item);
        var newItem = this.data.products[index];
        newItems.push(newItem.id);
      })
      let newHistory = [];
      this.data.originHistory.forEach(item => {
        if (newItems.indexOf(item.key) > -1) {
          newHistory.push(item);
        };
      });
      this.setData({
        history: newHistory,
      })
    }else{
      this.setData({
        history: this.data.originHistory,
      })
    }
  }
})