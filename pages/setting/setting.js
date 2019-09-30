// pages/setting/setting.js
import genID from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    settings:[],
    products:[],
    history:[],
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
      var value = wx.getStorageSync('store');
      var history = wx.getStorageSync('history');
      if (value) {
        // Do something with return value
        this.setData({
          products: value,
          history: history
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
    this.setData({
      settings: []
    })
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

  addItem:function(){
    this.data.settings.push({
      name:'',
      num:0,
      id: this.genID()
    })
    this.setData({
      settings: this.data.settings,
    })
  },

  deleteItem:function(index){
    this.data.settings.splice(index,1);
    this.setData({
      settings: this.data.settings,
    })
  },

  subItem: function (index) {
    if(this.validate()){
      wx.setStorage({
        key: "store",
        data: this.data.settings.concat(this.data.products)
      })
      this.data.settings.forEach(e => {
        let historyItem = {
          key: e.id,
          name: e.name,
          action: '新增产品',
          num: '+' + e.num,
          date: Date.now(),
        }
        this.data.history.unshift(historyItem);
        wx.setStorage({
          key: "history",
          data: this.data.history
        });
      });
      wx.switchTab({
        url: '/pages/inventoryQuery/inventoryQuery'
      });
    }else{
      wx.showToast({
        title: '物品名称未输入',
        icon: 'none',
        duration: 2000
      })
    }
  },

  setName:function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var oldItem = this.data.settings[index];
    oldItem.name = e.detail.value;
    this.setData({
      settings: this.data.settings,
    })
  },

  setNum: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var oldItem = this.data.settings[index];
    oldItem.num = e.detail.value;
    this.setData({
      settings: this.data.settings,
    })
  },

  validate:function(){
    var settings = this.data.settings;
    var result = settings.find(e=>{
      return e.name === '' || e.num === '';
    });
    if(result){
      return false;
    }else{
      return true;
    };
  },
  genID:function(){
    return Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36);
  }
})