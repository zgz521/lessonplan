// pages/video/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoObj: null,
    isInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var isInfo = app.checkInfo();
    var videoObj = app.globalData.videoObj;
    if (!videoObj.Recommend)
      videoObj.Recommend ='暂无微课介绍';
    this.setData({
      videoObj: videoObj,
      isInfo: isInfo
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})