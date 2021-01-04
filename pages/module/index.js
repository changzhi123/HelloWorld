// pages/module/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerStyle: '',
    containerStyle1: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.animate('#container', [
      { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
      { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00' },
      { opacity: 1.0, rotate: 90, backgroundColor: '#FF0000' },
    ], 5000)
    this.animate('.block', [
      { scale: [1, 1], rotate: 0, ease: 'ease-out' },
      { scale: [1.5, 1.5], rotate: 45, ease: 'ease-in'},
      { scale: [2, 2], rotate: 90 },
    ], 5000)
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

  }
})