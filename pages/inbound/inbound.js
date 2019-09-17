// pages/inbound/inbound.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    inList: [],
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
    indexs.forEach(e=>{
       var index = parseInt(e);
       var newItem = this.data.products[index];
       var copyItem = {
         id:newItem.id,
         name:newItem.name,
         num:0,
       }
      newItems.push(copyItem);
    })
    this.setData({
      inList: newItems
    });
  },

  setNum: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var oldItem = this.data.inList[index];
    oldItem.num = e.detail.value;
    this.setData({
      inList: this.data.inList,
    })
  },

  inBound:function(){
    if (this.validate()) {
      var products = this.data.products;
      this.data.inList.forEach(e =>{
        var current = products.find(item => {
          return item.id === e.id;
        });
        current.num = parseInt(current.num) + parseInt(e.num);
      });
      wx.setStorage({
        key: "store",
        data: products
      })
      wx.redirectTo({
        url: '/pages/index/index'
      })  
    }else{
      wx.showToast({
        title: '物品入库数量未输入',
        icon: 'none',
        duration: 2000
      })
    }
  },
  
  validate: function () {
    var inList = this.data.inList;
    var result = inList.find(e => {
      return e.num === '' || e.num <= 0;
    });
    if (result) {
      return false;
    } else {
      return true;
    };
  }
})