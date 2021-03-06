// pages/my/basic.js
const app = getApp()
const http = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    sexs: ['男', '女'],
    index: -1,
    isInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.checkLogin();
    var isInfo = app.checkInfo();
    var index = -1;
    if (app.globalData.userInfo.Sex) {
      for (var i = 0; i < this.data.sexs.length; i++) {
        if (this.data.sexs[i] == app.globalData.userInfo.Sex) {
          index = i;
          break;
        }
      }
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      index: index,
      isInfo: isInfo
    });
  },

  bindSexChange: function(e) {
    this.setData({
      index: e.detail.value
    });
  },

  modify: function(e) {
    var data = e.detail.value;
    data['PK_UserGuid'] = app.globalData.userGuid;
    if (this.data.index < 0)
      data['Sex'] = null;
    else
      data['Sex'] = this.data.sexs[this.data.index];
    if (data['Msg'] == '')
      data['Msg'] = '尚未签名';
    http.request({
      url: 'https://clientaccountserver.lessonplan.cn/user/info',
      data: data,
      method: 'PUT',
    }, true, false).then(function(res2) {
      if (res2.data.status == 1) {
        http.request({
          url: 'https://clientaccountserver.lessonplan.cn/user/usermsg/' + app.globalData.userGuid
        }, false, true).then(function(res) {
          if (!res.data.data.HeadPhotoPath)
            res.data.data.HeadPhotoPath = 'https://cdn.lessonplan.cn/Public/IMG/default-avatar.png';
          if (res.data.data.HeadPhotoPath.indexOf('http') == -1)
            res.data.data.HeadPhotoPath = 'https://static.lessonplan.cn' + res.data.data.HeadPhotoPath;
          if (!res.data.data.Msg)
            res.data.data.Msg = '尚未签名';
          app.globalData.userInfo = res.data.data;
          wx.showToast({
            title: '更新成功',
          });
          wx.navigateTo({
            url: 'success',
          });
        });
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '更新失败..',
          icon: 'none',
        })
      }
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
    var isInfo = app.checkInfo();
    this.setData({
      isInfo: isInfo
    });
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