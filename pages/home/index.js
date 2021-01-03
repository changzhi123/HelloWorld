// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:'这是小程序',
    city:['四川', '上海','北京']
  },
  btn(){
    console.log(123);//打印数据
    this.setData({
      str:'我已经修改你了，哈哈'
    })//修改data中的数据的方法

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求接口可以写在这个生命周期里面
  console.log(1,'onLoad')
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